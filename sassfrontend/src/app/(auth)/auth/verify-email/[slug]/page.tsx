"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function VerifyEmailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { slug } = use(params); // ✅ Properly unwrap `params`
// console.log(slug)
  useEffect(() => {
    if (!slug) {
      toast.error("Invalid verification link.");
      router.replace("/");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/verify-email/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          toast.success("Email verified successfully!");
          setTimeout(() => router.replace("/auth/login"), 3000);
        } else {
          toast.error(data?.detail || "Verification failed. Please try again.");
          router.replace("/");
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        router.replace("/");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [slug, router]);

  if (loading) return <div>Verifying email...</div>;

  return null; // No UI needed after redirect
}
