"use client";

import { Session } from "next-auth";
import updateUserData from "../(root)/profile/actions";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const EditUserProfileInfo = ({ user }: { user: Session["user"] }) => {
  const [response, setResponse] = useState<string>();
  const [responseColor, setResponseColor] = useState<string>("");
  const { update } = useSession();
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const updated = await updateUserData(formData);

    setResponse(updated.message);
    setResponseColor(updated.color);

    if (updated.user) {
      await update({
        user: {
          name: updated.user.name,
          email: updated.user.email,
        },
      });

      router.refresh();
    }
  }

  return (
    <div className="section-primary mt-10">
      <h2>Uredi svoje podatke</h2>

      <form
        action={(formData) => handleSubmit(formData)}
        className="flex flex-col space-y-5"
      >
        <div className="edit-user-info-div">
          <div className="flex flex-col">
            <label htmlFor="username">Uporabniško ime</label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-text-input"
              defaultValue={user?.name || ""}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">E - pošta</label>
            <input
              id="email"
              name="email"
              type="text"
              className="form-text-input"
              defaultValue={user?.email || ""}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="oldPassword">Trenutno geslo</label>
            <input
              id="oldPassword"
              name="oldPassword"
              type="password"
              className="form-text-input"
              required
            />
            <p>* zahtevan podatek</p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="newPassword">Novo geslo</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              className="form-text-input"
            />
          </div>
        </div>

        <div className="update-user-submit">
          <p className={`flex items-center justify-center ${responseColor}`}>
            {response}
          </p>
          <button className="btn w-full sm:w-30">Potrdi</button>
        </div>
      </form>
    </div>
  );
};
export default EditUserProfileInfo;
