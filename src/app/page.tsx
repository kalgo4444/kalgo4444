import { pageMetadata, personJsonLd } from "@/entities/profile";
import { JsonLd } from "@/shared/ui/json-ld";
import { HomePage } from "@/views/home";

export const metadata = pageMetadata("/");

export default function Page() {
  return (
    <>
      <JsonLd data={personJsonLd} />
      <HomePage />
    </>
  );
}
