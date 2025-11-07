import { cn } from "@/lib/utils";
import { Button } from "../Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../Components/ui/field";
import { Input } from "../Components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "@/api/axios";
import toast from "react-hot-toast";

export function SignupForm() {
  const [form, setform] = useState({username: "", email: "", password: ""});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await registerUser(form);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="  flex flex-col gap-6">
      <Card className="bg-[#171717] text-white border border-[#2E2F2F]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  className="border-[#424242] bg-[#212121]"
                  name="username"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={form.username}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  className="border-[#424242] bg-[#212121]"
                  name="email"
                  type="email"
                  placeholder="xyz@example.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <Field className="">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      className="border-[#424242] bg-[#212121]"
                      name="password"
                      type="password"
                      required
                      value={form.password}
                      onChange={handleChange}
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Field>
                <Button
                  type="submit"
                  className="bg-gray-50 text-black hover:bg-gray-200 hover:text-black cursor-pointer"
                  disabled={loading}
                >
                  { loading ? "Signing Up..." : "Sign Up"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <span className="underline">
                    <Link to="/login">Sign in</Link>
                  </span>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
