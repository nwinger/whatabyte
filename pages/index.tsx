import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Layout from '../components/Layout';

const Index = () => {
	const { loading, error, data } = useQuery(gql`
		{
			pokemon(name: "Pikachu") {
				name
			}
		}
	`);

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
			<div>{data && data.pokemon && <p>{data.pokemon.name}</p>}</div>
		</Layout>
	);
};

export default Index;
