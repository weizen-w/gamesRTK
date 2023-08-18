import styles from '../styles/Profil.module.css';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAuth, selectUser } from '../selectors';
import { edit, loadUser } from '../usersSlice';
import User from '../types/User';

export default function Profil(): JSX.Element {
	const auth = useAppSelector(selectAuth);
	const user = useAppSelector(selectUser);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const [newUser, setNewUser] = useState<User>(user);

	function getStyleByNoActive(): void {
		const currActiveBtnArray = document.getElementsByClassName(
			`${styles.btnStyle} ${styles.btnActive}`
		);
		for (var i = 0; i < currActiveBtnArray.length; i++) {
			currActiveBtnArray[i].className = styles.btnStyle;
		}
	}
	function choiceNavBar(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		e.preventDefault();
		const userDiv = document.getElementById('user');
		const privatDiv = document.getElementById('privat');
		const workDiv = document.getElementById('work');
		const bankDiv = document.getElementById('bank');
		const systemDiv = document.getElementById('system');
		if (
			userDiv?.className &&
			privatDiv?.className &&
			workDiv?.className &&
			bankDiv?.className &&
			systemDiv?.className
		) {
			userDiv.className = styles.userData;
			privatDiv.className = styles.privatData;
			workDiv.className = styles.educWorkData;
			bankDiv.className = styles.financialData;
			systemDiv.className = styles.systemData;
			getStyleByNoActive();
			switch (e.currentTarget.value) {
				case 'user': {
					userDiv.className = styles.userDataActive;
					e.currentTarget.className = `${styles.btnStyle} ${styles.btnActive}`;
					break;
				}
				case 'privat': {
					privatDiv.className = styles.privatDataActive;
					e.currentTarget.className = `${styles.btnStyle} ${styles.btnActive}`;
					break;
				}
				case 'work': {
					workDiv.className = styles.educWorkDataActive;
					e.currentTarget.className = `${styles.btnStyle} ${styles.btnActive}`;
					break;
				}
				case 'bank': {
					bankDiv.className = styles.financialDataActive;
					e.currentTarget.className = `${styles.btnStyle} ${styles.btnActive}`;
					break;
				}
				case 'system': {
					systemDiv.className = styles.systemDataActive;
					e.currentTarget.className = `${styles.btnStyle} ${styles.btnActive}`;
					break;
				}
				default:
					console.log('error by method choiceNavBar()');
					break;
			}
		}
	}

	useEffect(() => {
		dispatch(loadUser(auth.id));
	}, [auth]);

	return (
		<div className={styles.pageStyle}>
			<div className={styles.leftBar}>
				<img className={styles.imageStyle} src={user.image} alt={user.username} />
				<div className={styles.navBar}>
					<button className={styles.btnStyle} onClick={(e) => choiceNavBar(e)} value="user">
						User data
					</button>
					<button className={styles.btnStyle} onClick={(e) => choiceNavBar(e)} value="privat">
						Privat date
					</button>
					<button className={styles.btnStyle} onClick={(e) => choiceNavBar(e)} value="work">
						Education and work date
					</button>
					<button className={styles.btnStyle} onClick={(e) => choiceNavBar(e)} value="bank">
						Financial date
					</button>
					<button className={styles.btnStyle} onClick={(e) => choiceNavBar(e)} value="system">
						System date
					</button>
				</div>
			</div>
			<div className={styles.rightBox}>
				<h1>Profil {user.username.toUpperCase()}</h1>
				{isEdit ? (
					<label
						className={styles.changeLabelSave}
						onClick={() => {
							dispatch(edit(newUser));
							setIsEdit(false);
						}}
					>
						Save Changes
					</label>
				) : (
					<label className={styles.changeLabelEdit} onClick={() => setIsEdit(true)}>
						<CreateOutlinedIcon />
						To change the data
					</label>
				)}
				<div id="user" className={styles.userData}>
					<h2>User data</h2>
					<p>
						<b className={styles.keyDaten}>User name</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.username}
									onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.username}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Password</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.password}
									onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.password}</span>
							</>
						)}
					</p>
				</div>
				<div id="privat" className={styles.privatData}>
					<h2>Personal data</h2>
					<p>
						<b className={styles.keyDaten}>First name</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.firstName}
									onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.firstName}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Last name</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.lastName}
									onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.lastName}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Maiden name</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.maidenName}
									onChange={(e) => setNewUser({ ...newUser, maidenName: e.target.value })}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.maidenName}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Birth date</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.birthDate}
									onChange={(e) => setNewUser({ ...newUser, birthDate: e.target.value })}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.birthDate}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Age</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.age}
									onChange={(e) => setNewUser({ ...newUser, age: Number(e.target.value) })}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.age}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Gender</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.gender}
									onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.gender}</span>
							</>
						)}
					</p>
					<h2>Contact details</h2>
					<p>
						<b className={styles.keyDaten}>Email</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.email}
									onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.email}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Phone</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.phone}
									onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.phone}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Address</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.address.state}
									onChange={(e) =>
										setNewUser({ ...newUser, address: { ...user.address, state: e.target.value } })
									}
									type="text"
								/>
								<input
									className={styles.valueDaten}
									defaultValue={user.address.postalCode}
									onChange={(e) =>
										setNewUser({
											...newUser,
											address: { ...user.address, postalCode: e.target.value },
										})
									}
									type="text"
								/>
								<input
									className={styles.valueDaten}
									defaultValue={user.address.city}
									onChange={(e) =>
										setNewUser({ ...newUser, address: { ...user.address, city: e.target.value } })
									}
									type="text"
								/>
								<input
									className={styles.valueDaten}
									defaultValue={user.address.address}
									onChange={(e) =>
										setNewUser({
											...newUser,
											address: { ...user.address, address: e.target.value },
										})
									}
									type="text"
								/>
							</>
						) : (
							<>
								<span
									className={styles.valueDaten}
								>{`${user.address.state}, ${user.address.postalCode} ${user.address.city}, ${user.address.address}`}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Coordinates</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.address.coordinates.lat}
									onChange={(e) =>
										setNewUser({
											...newUser,
											address: {
												...user.address,
												coordinates: { ...user.address.coordinates, lat: Number(e.target.value) },
											},
										})
									}
									type="text"
								/>
								<input
									className={styles.valueDaten}
									defaultValue={user.address.coordinates.lng}
									onChange={(e) =>
										setNewUser({
											...newUser,
											address: {
												...user.address,
												coordinates: { ...user.address.coordinates, lng: Number(e.target.value) },
											},
										})
									}
									type="text"
								/>
							</>
						) : (
							<>
								<span
									className={styles.valueDaten}
								>{`lat.: ${user.address.coordinates.lat} lng.: ${user.address.coordinates.lng}`}</span>
							</>
						)}
					</p>
					<h2>Other data</h2>
					<p>
						<b className={styles.keyDaten}>Height</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.height}
									onChange={(e) => setNewUser({ ...newUser, height: Number(e.target.value) })}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.height}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Weight</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.weight}
									onChange={(e) => setNewUser({ ...newUser, weight: Number(e.target.value) })}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.weight}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Blood group</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.bloodGroup}
									onChange={(e) => setNewUser({ ...newUser, bloodGroup: e.target.value })}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.bloodGroup}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Eye color</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.eyeColor}
									onChange={(e) => setNewUser({ ...newUser, eyeColor: e.target.value })}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.eyeColor}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Hair</b>
						<span className={styles.valueDaten}>
							<b className={styles.keyDaten}>Color</b>
							{isEdit ? (
								<>
									<input
										className={styles.valueDaten}
										defaultValue={user.hair.color}
										onChange={(e) =>
											setNewUser({ ...newUser, hair: { ...user.hair, color: e.target.value } })
										}
										type="text"
									/>
								</>
							) : (
								<>
									<span className={styles.valueDaten}>{user.hair.color}</span>
								</>
							)}
						</span>
						<span className={styles.valueDaten}>
							<b className={styles.keyDaten}>Type</b>
							{isEdit ? (
								<>
									<input
										className={styles.valueDaten}
										defaultValue={user.hair.type}
										onChange={(e) =>
											setNewUser({ ...newUser, hair: { ...user.hair, type: e.target.value } })
										}
										type="text"
									/>
								</>
							) : (
								<>
									<span className={styles.valueDaten}>{user.hair.type}</span>
								</>
							)}
						</span>
					</p>
				</div>
				<div id="work" className={styles.educWorkData}>
					<h2>Education</h2>
					<p>
						<b className={styles.keyDaten}>University</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.university}
									onChange={(e) => setNewUser({ ...newUser, university: e.target.value })}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.university}</span>
							</>
						)}
					</p>
					<h2>Work</h2>
					<p>
						<b className={styles.keyDaten}>Company name</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.company.name}
									onChange={(e) =>
										setNewUser({ ...newUser, company: { ...user.company, name: e.target.value } })
									}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.company.name}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Department</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.company.department}
									onChange={(e) =>
										setNewUser({
											...newUser,
											company: { ...user.company, department: e.target.value },
										})
									}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.company.department}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Title</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.company.title}
									onChange={(e) =>
										setNewUser({ ...newUser, company: { ...user.company, title: e.target.value } })
									}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.company.title}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Address</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.company.address.state}
									onChange={(e) =>
										setNewUser({
											...newUser,
											company: {
												...user.company,
												address: { ...user.company.address, state: e.target.value },
											},
										})
									}
									type="text"
								/>
								<input
									className={styles.valueDaten}
									defaultValue={user.company.address.postalCode}
									onChange={(e) =>
										setNewUser({
											...newUser,
											company: {
												...user.company,
												address: { ...user.company.address, postalCode: e.target.value },
											},
										})
									}
									type="text"
								/>
								<input
									className={styles.valueDaten}
									defaultValue={user.company.address.city}
									onChange={(e) =>
										setNewUser({
											...newUser,
											company: {
												...user.company,
												address: { ...user.company.address, city: e.target.value },
											},
										})
									}
									type="text"
								/>
								<input
									className={styles.valueDaten}
									defaultValue={user.company.address.address}
									onChange={(e) =>
										setNewUser({
											...newUser,
											company: {
												...user.company,
												address: { ...user.company.address, address: e.target.value },
											},
										})
									}
									type="text"
								/>
							</>
						) : (
							<>
								<span
									className={styles.valueDaten}
								>{`${user.company.address.state}, ${user.company.address.postalCode} ${user.company.address.city}, ${user.company.address.address}`}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Coordinates</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.company.address.coordinates.lat}
									onChange={(e) =>
										setNewUser({
											...newUser,
											company: {
												...user.company,
												address: {
													...user.company.address,
													coordinates: {
														...user.company.address.coordinates,
														lat: Number(e.target.value),
													},
												},
											},
										})
									}
									type="text"
								/>
								<input
									className={styles.valueDaten}
									defaultValue={user.company.address.coordinates.lng}
									onChange={(e) =>
										setNewUser({
											...newUser,
											company: {
												...user.company,
												address: {
													...user.company.address,
													coordinates: {
														...user.company.address.coordinates,
														lng: Number(e.target.value),
													},
												},
											},
										})
									}
									type="text"
								/>
							</>
						) : (
							<>
								<span
									className={styles.valueDaten}
								>{`lat.: ${user.company.address.coordinates.lat} lng.: ${user.company.address.coordinates.lng}`}</span>
							</>
						)}
					</p>
				</div>
				<div id="bank" className={styles.financialData}>
					<h2>Financial data</h2>
					<h3>Card</h3>
					<p>
						<b className={styles.keyDaten}>IBAN</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.bank.iban}
									onChange={(e) =>
										setNewUser({ ...newUser, bank: { ...user.bank, iban: e.target.value } })
									}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.bank.iban}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Card type</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.bank.cardType}
									onChange={(e) =>
										setNewUser({ ...newUser, bank: { ...user.bank, cardType: e.target.value } })
									}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.bank.cardType}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Card number</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.bank.cardNumber}
									onChange={(e) =>
										setNewUser({ ...newUser, bank: { ...user.bank, cardNumber: e.target.value } })
									}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.bank.cardNumber}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Card expire</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.bank.cardExpire}
									onChange={(e) =>
										setNewUser({ ...newUser, bank: { ...user.bank, cardExpire: e.target.value } })
									}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.bank.cardExpire}</span>
							</>
						)}
					</p>
					<p>
						<b className={styles.keyDaten}>Currency</b>
						{isEdit ? (
							<>
								<input
									className={styles.valueDaten}
									defaultValue={user.bank.currency}
									onChange={(e) =>
										setNewUser({ ...newUser, bank: { ...user.bank, currency: e.target.value } })
									}
									type="text"
								/>
							</>
						) : (
							<>
								<span className={styles.valueDaten}>{user.bank.currency}</span>
							</>
						)}
					</p>
				</div>
				<div id="system" className={styles.systemData}>
					<h2>System data</h2>
					<p>
						<b className={styles.keyDaten}>Domain</b>
						{user.domain}
					</p>
					<p>
						<b className={styles.keyDaten}>IP</b>
						{user.ip}
					</p>
					<p>
						<b className={styles.keyDaten}>MAC-address</b>
						{user.macAddress}
					</p>
					<p>
						<b className={styles.keyDaten}>MAC-address</b>
						{user.macAddress}
					</p>
					<br />
					<p>
						<b className={styles.keyDaten}>EIN</b>
						{user.ein}
					</p>
					<p>
						<b className={styles.keyDaten}>SSN</b>
						{user.ssn}
					</p>
					<p>
						<b className={styles.keyDaten}>User agent</b>
						{user.userAgent}
					</p>
				</div>
			</div>
		</div>
	);
}
