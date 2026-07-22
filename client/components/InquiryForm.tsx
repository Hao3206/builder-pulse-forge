import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

interface InquiryFormProps {
  source: string;
  companyPlaceholder?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
}

export default function InquiryForm({
  source,
  companyPlaceholder = "您的公司/岗位",
  messagePlaceholder = "请描述您的需求",
  submitLabel = "提交咨询",
}: InquiryFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          contact: data.get("contact"),
          company: data.get("company"),
          message: data.get("message"),
          source,
          website: data.get("website"),
        }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || "提交失败，请稍后重试");
      }
      form.reset();
      setResult({ type: "success", text: "提交成功，我们会尽快与您联系。" });
    } catch (error) {
      setResult({
        type: "error",
        text: error instanceof Error ? error.message : "提交失败，请稍后重试",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    "w-full rounded-md border border-[#DAE0E6] bg-white px-4 py-3 text-[15px] shadow-sm outline-none transition focus:border-[#058A65] focus:ring-2 focus:ring-[#058A65]/15";

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <input
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[10000px] h-px w-px opacity-0"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <input
          name="name"
          type="text"
          required
          maxLength={80}
          autoComplete="name"
          placeholder="您的姓名"
          className={fieldClass}
        />
        <input
          name="contact"
          type="text"
          required
          maxLength={120}
          inputMode="text"
          autoComplete="tel"
          placeholder="手机号或邮箱"
          className={fieldClass}
        />
      </div>
      <input
        name="company"
        type="text"
        maxLength={160}
        autoComplete="organization"
        placeholder={companyPlaceholder}
        className={fieldClass}
      />
      <textarea
        name="message"
        maxLength={2000}
        placeholder={messagePlaceholder}
        rows={5}
        className={`${fieldClass} resize-none`}
      />
      {result && (
        <div
          role="status"
          aria-live="polite"
          className={`flex items-center justify-center gap-2 text-sm ${result.type === "success" ? "text-[#058A65]" : "text-red-600"}`}
        >
          {result.type === "success" && <CheckCircle2 className="h-4 w-4" />}
          {result.text}
        </div>
      )}
      <div className="text-center">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-w-28 items-center justify-center gap-2 rounded-full bg-[#058A65] px-6 py-3 text-[15px] font-semibold text-white shadow-sm transition hover:bg-[#046B52] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? "提交中..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
