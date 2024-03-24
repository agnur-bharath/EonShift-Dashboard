import { redirect } from "next/navigation";

const DefaultPage = () => {
  // Redirect to user to the dashboard endpoint, if there are on the default endpoint.
  redirect("/dashboard");
};

export default DefaultPage;
