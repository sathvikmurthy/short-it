import { atom } from 'recoil';

export const userNameState = atom({
  key: 'userNameState',
  default: "",
});

export const userEmailState = atom({
  key: 'userEmailState',
  default: "",
});

export const userLogoState = atom({
  key: 'userLogoState',
  default: "",
});

export const isLogState = atom({
	key: 'isLogState',
	default: "false",
})

export const topLoadState = atom({
	key: 'topLoadState',
	default: false,
})