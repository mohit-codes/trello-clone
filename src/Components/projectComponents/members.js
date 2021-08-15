import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { backendUrl } from "../../util";
import { useAuth } from "../../Context/AuthProvider";

export const Members = ({ project }) => {
  const [members, setMembers] = useState(project.teamMembers);
  const [editMembers, setEditMembers] = useState(false);
  const { user } = useAuth();
  const removeMember = async (e, memberId) => {
    e.preventDefault();
    await axios.post(`${backendUrl}/projects/removeMember/${project._id}`, {
      memberId: memberId,
    });
    setMembers((prevState) =>
      prevState.filter((member) => member.memberId !== memberId)
    );
  };

  const isAdmin = project.adminId === user._id;
  return (
    <div className=" w-300 md:w-500 h-500 overflow-y-scroll ml-auto mr-auto py-10">
      <div className="flex justify-between">
        <span className="font-semibold">{`Team Members (${members.length})`}</span>{" "}
        {isAdmin && (
          <i
            className="fa fa-cog text-lg cursor-pointer "
            onClick={() => setEditMembers(!editMembers)}
          ></i>
        )}
      </div>
      <div className="mt-10 space-y-3">
        {members.map((member) => (
          <div key={member.memberId} className="flex items-start">
            <div className=" mr-2 bg-gray-700 text-white text-2xl py-1 w-10 h-10 text-center">
              {member.username[0].toUpperCase()}
            </div>
            <div>
              <p className="text-black font-medium">{member.username}</p>
            </div>
            {!editMembers && (
              <div className="ml-auto bg-gray-200 py-1 px-2 text-gray-500 rounded-md">
                {project.adminId === member.memberId ? "Admin" : "Member"}
              </div>
            )}
            {project.adminId !== member.memberId && editMembers && (
              <div
                className=" bg-gray-200 ml-auto cursor-pointer  py-1 px-2 text-gray-500 rounded-md"
                onClick={(e) => removeMember(e, member.memberId)}
              >
                <i className="fas fa-times "></i> Remove Member
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Members.propTypes = {
  project: PropTypes.object,
};

export default Members;
