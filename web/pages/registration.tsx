import { useUser } from "@auth0/nextjs-auth0";

const handleRoute = () => {
  if (typeof window !== "undefined") {
    window.location.assign("/");
  }
};

const Registration = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;

  if (user) {
    if (user.email === user.name) {
      return <div>Je hebt nog geen naam</div>;
    } else {
      window.location.assign("/profile");
      return <div>niks..</div>;
    }
  } else {
    handleRoute();
    return <div>handeling route...</div>;
  }
};

export default Registration;
