import React from "react";

export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-left mt-10 mb-4">
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mt-2 text-base sm:text-lg text-gray-600">{subtitle}</p>
    </div>
  );
}
