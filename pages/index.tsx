import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Layout from '../components/Layout';

const Index = () => {
	const { loading, error, data } = useQuery(gql`
		{
			allUsers {
				email
			}
		}
	`);

	console.log(loading);
	console.log(error);
	console.log(data);
	return (
		<Layout>
			{' '}
			<br />
			<Link href="/explore">
				<a> Welcome to WHATABYTE! Start Exploring Now</a>
			</Link>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{data && (
				<ul>
					{data.allUsers.map(user => (
						<li>{user.email}</li>
					))}
				</ul>
			)}
		</Layout>
	);
};

export default Index;
