import { AppConfig } from "@/config";

export default function Home() {
  return (
    <>
      <div>Home page for {AppConfig.appTitle}</div>
    </>
  );
}
