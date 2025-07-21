import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FormData = {
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  category: string;
};

export default function AdminNewsEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const form = useForm<FormData>();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchNewsArticle = async () => {
        try {
          const token = localStorage.getItem("admin_token");
          const response = await fetch(`/api/admin/news/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            form.reset(data);
          }
        } catch (error) {
          console.error("Failed to fetch news article:", error);
        }
      };
      fetchNewsArticle();
    }
  }, [id, form]);

  const onSubmit = async (data: FormData) => {
    try {
      const token = localStorage.getItem("admin_token");
      const url = isEditMode ? `/api/admin/news/${id}` : "/api/admin/news";
      const method = isEditMode ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      navigate("/admin/news");
    } catch (error) {
      console.error("Failed to save news article:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? "编辑新闻" : "添加新闻"}
      </h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>标题</FormLabel>
                  <FormControl>
                    <Input placeholder="输入新闻标题" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>内容</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="输入新闻内容"
                      className="resize-y"
                      rows={10}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>图片链接</FormLabel>
                  <FormControl>
                    <Input placeholder="输入图片URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>作者</FormLabel>
                  <FormControl>
                    <Input placeholder="输入作者" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>分类</FormLabel>
                  <FormControl>
                    <Input placeholder="输入分类" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">
                {isEditMode ? "更新" : "创建"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
