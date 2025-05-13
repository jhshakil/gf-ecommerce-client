"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth.provider";
import { updateCustomerService } from "@/services/CustomerService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const { user, customer, setCustomer } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    phone: customer?.phone || "",
    address: customer?.address || "",
    city: customer?.city || "",
    zipCode: customer?.zipCode || "",
    country: customer?.country || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData({
      phone: customer?.phone || "",
      address: customer?.address || "",
      city: customer?.city || "",
      zipCode: customer?.zipCode || "",
      country: customer?.country || "",
    });
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const needsUpdate = Object.entries(formData).some(
        ([key, value]) => customer?.[key as keyof typeof customer] !== value
      );

      if (needsUpdate) {
        const customer = await updateCustomerService(formData);
        if (customer) setCustomer(customer);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
      toast("Update Failed");
    } finally {
      setIsLoading(false);
      toast("Successfully Updated");
    }
  };

  if (!user) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold">Please log in to view this page</h1>
        <Button className="mt-4" onClick={() => router.push("/login")}>
          Log In
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-2xl font-bold">My Account</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="mb-1">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={user.name || ""}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="mb-1">
                    Email
                  </Label>
                  <Input id="email" type="email" value={user.email} disabled />
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">
                Shipping Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="phone" className="mb-1">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address" className="mb-1">
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="mb-1">
                    City
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode" className="mb-1">
                    Zip/Postal Code
                  </Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="country" className="mb-1">
                    Country
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Order History</h2>
            <p className="text-muted-foreground">
              View and manage your past orders
            </p>
            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() => router.push("/customer/orders")}
            >
              View Order History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
