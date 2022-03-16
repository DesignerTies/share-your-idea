import { useUser } from "@auth0/nextjs-auth0";
import { NextPage } from "next";
import { useEffect, useState, useRef } from "react";

const handleRoute = () => {
  if (typeof window !== "undefined") {
    window.location.assign("/");
  }
};

const formSubmit = async (): Promise<void> => {
  console.log();
};

const Registration: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const [role, setRole] = useState("");
  const roleChange: any = useRef();

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;

  if (user) {
    if (user.email === user.name) {
      return (
        <div>
          <form
            action=''
            onSubmit={() => {
              formSubmit();
            }}
          >
            <input type='text' name='name' placeholder='name' />
            <select
              name='role-select'
              id=''
              ref={roleChange}
              onChange={() => setRole(roleChange.current.value)}
            >
              <option value='Start-Up'>Start-Up</option>
              <option value='Investor'>Investor</option>
            </select>
            {role === "Investor" && (
              <>
                <input type='text' name='toInvest' placeholder='To invest' />
                <input type='text' name='company' placeholder='company' />
              </>
            )}
            <input type='submit' />
          </form>
        </div>
      );
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
