import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then(response => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">
        Users
      </div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users.map(user => (
          <div key={user._id} className="flex">
            <User user={user} />
            <SendMoneyButton user={user} />
          </div>
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  return (
    <div className="flex">
      <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
        <div className="flex flex-col justify-center h-full text-xl">
          {user.firstName[0]}
        </div>
      </div>
      <div className="flex flex-col justify-center h-ful">
        <div>
          {user.firstName} {user.lastName}
        </div>
      </div>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
};


function SendMoneyButton({ user }) {
  const navigate = useNavigate(); // useNavigate is used inside the functional component
  return (
    <div className="flex flex-col justify-center h-ful">
      <Button
        onClick={() => {
          navigate(`/send?id=${user._id}&name=${user.firstName}`);
        }}
        label="Send Money"
      />
    </div>
  );
}

SendMoneyButton.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
  }).isRequired,
};
