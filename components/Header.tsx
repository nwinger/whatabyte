import Link from 'next/link';
import './Header.scss';
interface Props {
	appTitle: string;
}
const Header: React.FC<Props> = props => (
	<Link href="/">
		<div className="Header">{props.appTitle}</div>
	</Link>
);

export default Header;
