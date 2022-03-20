import { HandlerError, useUser } from "@auth0/nextjs-auth0";
import { NextPage } from "next";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const handleRoute = () => {
  if (typeof window !== "undefined") {
    window.location.assign("/");
  }
};

const formSubmit = (nameVal: string, userId: any) => {
  axios
    .put("/api/handleRegistration", {
      data: {
        userName: nameVal,
        userId: userId,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        handleRoute();
      }
    })
    .catch((error) => console.log(error));
};

const Registration: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const [role, setRole] = useState("");
  const nameRef: any = useRef();
  const roleChange: any = useRef();

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;

  if (user) {
    if (user.email === user.name) {
      return (
        <div>
          <form
            action=''
            onSubmit={(e) => {
              e.preventDefault();
              formSubmit(nameRef.current.value, user.sub);
            }}
          >
            <input type='text' placeholder='name' ref={nameRef} />
            <select
              id=''
              ref={roleChange}
              onChange={() => setRole(roleChange.current.value)}
            >
              <option value='Start-Up'>Start-Up</option>
              <option value='Investor'>Investor</option>
            </select>
            {role === "Investor" && (
              <>
                <input type='text' placeholder='To invest' />
                <input type='text' placeholder='company' />
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
