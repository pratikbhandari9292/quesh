import React from "react";

import DropdownMenu from "../dropdown-menu/dropdown-menu";
import UserCard from "../user-card/user-card";

const FloatingList = ({ list, type = "user" }) => {
	return (
		<DropdownMenu>
			{list.map((listItem) => {
				return (
					<UserCard
						{...listItem}
						userID={listItem._id}
						key={listItem._id}
					/>
				);
			})}
		</DropdownMenu>
	);
};

export default FloatingList;
