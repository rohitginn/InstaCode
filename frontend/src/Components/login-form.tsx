import { cn } from "@/lib/utils"
import { Button } from "../Components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../Components/ui/field"
import { Input } from "../Components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { loginUser } from "@/api/axios"
import toast from "react-hot-toast"

export function LoginForm() {

  const [form, setForm] = useState({email: "", password: ""});
  const [eror, setEror] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEror("");
    try {
      const {data} = await loginUser(form);
      localStorage.setItem("token", data.token);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="bg-[#171717] text-white border border-[#2E2F2F]">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  name="email"
                  onChange={handleChange}
                  className="border-[#424242] bg-[#212121]"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input name="password" onChange={handleChange} className="border-[#424242] bg-[#212121]" id="password" type="password" required />
              </Field>
              <Field>
                <Button className="bg-gray-50 text-black hover:bg-gray-200 hover:text-black" type="submit">Login</Button>
                
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <span className="underline"><Link to="/signup">Sign in</Link></span>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
