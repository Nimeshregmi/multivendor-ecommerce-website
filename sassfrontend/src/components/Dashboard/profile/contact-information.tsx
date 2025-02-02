import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactInfoProps {
  user: {
    contactNumber: string;
    email: string;
    address: string;
  };
}
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm font-medium ">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}

const ContactInfo = ({ user }: ContactInfoProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow label="Contact Number" value={user.contactNumber} />
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Address" value={user.address} />
        </CardContent>
      </Card>
    </>
  );
};

export default ContactInfo;
