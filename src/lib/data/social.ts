import Github from '$lib/assets/socials/github-mark.svg';
import Mail from '$lib/assets/socials/gmail.svg';
import Zenn from '$lib/assets/socials/zenn.svg';

export interface Social {
	label: string;
	href: string;
	icon: string;
}

export const Socials: Social[] = [
	{
		label: 'GitHub',
		href: 'https://github.com/dev-komenzar',
		icon: Github
	},
	{
		label: 'Zenn',
		href: 'https://zenn.dev/kometan',
		icon: Zenn
	},
	{
		label: 'Email',
		href: 'mailto:takuya.kometan@gmail.com',
		icon: Mail
	}
]

