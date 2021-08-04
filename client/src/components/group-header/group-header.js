import React, { useState } from "react";

import styles from "./group-header.module.scss";

import { ReactComponent as SearchIcon } from "../../assets/icons/search-secondary.svg";
import { ReactComponent as UsersIcon } from "../../assets/icons/users.svg";
import { ReactComponent as NotificationOutlineIcon } from "../../assets/icons/notification-outlined.svg";
import { ReactComponent as UserAddIcon } from "../../assets/icons/user-add.svg";

import OptionsToggle from "../options-toggle/options-toggle";

const GroupHeader = ({ title }) => {
	const [toggleOptions] = useState(["queue", "vote priority"]);

	return (
		<div className={styles.container}>
			<p className={styles.title}>{title}</p>
			<div className={styles.controls}>
				<OptionsToggle options={toggleOptions} />
				<SearchIcon className={styles.icon} />
				<UsersIcon className={styles.icon} />
				<NotificationOutlineIcon className={styles.icon} />
				<UserAddIcon className={styles.icon} />
			</div>
		</div>
	);
};

export default GroupHeader;
