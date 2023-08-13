import {useEffect, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styles from './Games.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectParams } from './selectors';
import { changeParams, initialState } from './gamesSlice';

export default function LeftBar(): JSX.Element {
	const params = useAppSelector(selectParams);
	const [sortBy, setSortBy] = useState<string>(params.sortBy);
	const [platform, setPlatform] = useState<string>(params.platform);
	const [tags, setTags] = useState<string>(params.tags);
	const [tagsSet, setTagsSet] = useState<Set<string>>(new Set());
	const [sortStyleState, setSortStyleState] = useState<string>(styles.filterSortStyle);
	const [platformStyleState, setPlatformStyleState] = useState<string>(styles.filterSortStyle);
	const [categoryStyleState, setCategoryStyleState] = useState<string>(styles.filterSortStyle);
	const inputsArray = document.getElementsByTagName('input');
	const dispatch = useAppDispatch();

	function clearParams(): void {
		setSortBy(initialState.params.sortBy);
		setPlatform(initialState.params.platform);
		setTags(initialState.params.tags);
		tagsSet.clear();
		setTagsSet(new Set(tagsSet));
		for (var i = 0; i < inputsArray.length; i++) {
			if (inputsArray[i].defaultChecked) {
				inputsArray[i].checked = true;
			} else {
				inputsArray[i].checked = false;
			}
		}
	}
	function addOrDeleteValueToSet(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
		e.currentTarget.checked
			? tagsSet.add(e.currentTarget.value)
			: tagsSet.delete(e.currentTarget.value);
		setTagsSet(new Set(tagsSet));
		addStringOfSet(tagsSet);
	}
	function addStringOfSet(set: Set<string>): void {
		let result = '';
		set.forEach((el) => {
			result += `.${el}`;
		});
		result = result.substring(1); // delete first dot
		setTags(result);
	}
	function expandListSort(): void {
		sortStyleState === styles.filterSortStyleActive
			? setSortStyleState(styles.filterSortStyle)
			: setSortStyleState(styles.filterSortStyleActive);
	}
	function expandListPlatform(): void {
		platformStyleState === styles.filterSortStyleActive
			? setPlatformStyleState(styles.filterSortStyle)
			: setPlatformStyleState(styles.filterSortStyleActive);
	}
	function expandListCategory(): void {
		categoryStyleState === styles.filterSortStyleActive
			? setCategoryStyleState(styles.filterSortStyle)
			: setCategoryStyleState(styles.filterSortStyleActive);
	}
	function checkChecked(): void {
		const tempArrayTags = tags.split('.');
		for (var i = 0; i < tempArrayTags.length; i++) {
			tagsSet.add(tempArrayTags[i]);
		};
		for (var i = 0; i < inputsArray.length; i++) {
			if (inputsArray[i].value === params.sortBy || inputsArray[i].value === params.platform || tagsSet.has(inputsArray[i].value)) {
				inputsArray[i].checked = true;
			} else {
				inputsArray[i].checked = false;
			}
		}
	}
	checkChecked();
	useEffect(() => {
		dispatch(
			changeParams({
				sortBy,
				platform,
				tags,
			})
		);
	}, [dispatch, sortBy, platform, tags, tagsSet]);
	return (
		<div className={styles.leftBarStyle}>
			<img className={styles.logoStyle} src="../../../logo-theBest.jpg" alt="the-best" />
			<div className={styles.textBoxLeftBox}>
				<button className={styles.btnClearStyle} type="button" onClick={clearParams}>
					Clear all params
				</button>
				<p className={styles.titleParamsStyle} onClick={() => expandListSort()}>
					Sort games
					<ArrowDropDownIcon />
				</p>
				<div className={`${sortStyleState} ${styles.sortBox}`}>
					<label><input onChange={(e) => setSortBy(e.target.value)} type="radio" name="sort" value="relevance" defaultChecked />Relevance</label>
					<label><input onChange={(e) => setSortBy(e.target.value)} type="radio" name="sort" value="release-date" />Release-date</label>
					<label><input onChange={(e) => setSortBy(e.target.value)} type="radio" name="sort" value="popularity" />Popularity</label>
					<label><input onChange={(e) => setSortBy(e.target.value)} type="radio" name="sort" value="alphabetical" />Alphabetical</label>
				</div>
				<p className={styles.titleParamsStyle} onClick={() => expandListPlatform()}>
					Filter by platform
					<ArrowDropDownIcon />
					</p>
				<div className={`${platformStyleState} ${styles.platformBox}`}>
					<label><input onChange={(e) => setPlatform(e.target.value)} type="radio" name="platform" value="all" defaultChecked />All</label>
					<label><input onChange={(e) => setPlatform(e.target.value)} type="radio" name="platform" value="pc" />PC</label>
					<label><input onChange={(e) => setPlatform(e.target.value)} type="radio" name="platform" value="browser" />Browser</label>
				</div>
				<p className={styles.titleParamsStyle} onClick={() => expandListCategory()}>
					Filter by category
					<ArrowDropDownIcon />
					</p>
				<div className={`${categoryStyleState} ${styles.categoryBox}`}>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="mmorpg" />mmorpg</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="shooter" />shooter</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="strategy" />strategy</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="moba" />moba</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="racing" />racing</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="sports" />sports</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="social" />social</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="sandbox" />sandbox</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="open-world" />open-world</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="survival" />survival</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="pvp" />pvp</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="pve" />pve</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="pixel" />pixel</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="voxel" />voxel</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="zombie" />zombie</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="turn-based" />turn-based</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="first-person" />first-person</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="third-Person" />third-Person</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="top-down" />top-down</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="tank" />tank</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="space" />space</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="sailing" />sailing</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="side-scroller" />side-scroller</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="superhero" />superhero</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="permadeath" />permadeath</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="card" />card</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="battle-royale" />battle-royale</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="mmo" />mmo</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="mmofps" />mmofps</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="mmotps" />mmotps</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="3d" />3d</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="2d" />2d</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="anime" />anime</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="fantasy" />fantasy</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="sci-fi" />sci-fi</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="fighting" />fighting</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="action-rpg" />action-rpg</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="action" />action</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="military" />military</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="martial-arts" />martial-arts</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="flight" />flight</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="low-spec" />low-spec</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="tower-defense" />tower-defense</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="horror" />horror</label>
					<label className={styles.categoryLabel}><input onClick={(e) => addOrDeleteValueToSet(e)} type="checkbox" value="mmorts" />mmorts</label>
				</div>
			</div>
		</div>
	);
}
