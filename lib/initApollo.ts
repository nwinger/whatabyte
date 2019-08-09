import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import { isBrowser } from './isBrowser';

let apolloClient = null;

function create(initialState) {
	// Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
	// const isBrowser = typeof window !== 'undefined';
	return new ApolloClient({
		connectToDevTools: isBrowser,
		ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
		link: new HttpLink({
			uri: 'https://graphql-pokemon.now.sh', // Server URL (must be absolute)
			credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
			// Use fetch() polyfill on the server
			fetch: !isBrowser && fetch
		}),
		cache: new InMemoryCache().restore(initialState || {})
	});
}

export default function initApollo(initialState, options: Options) {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (typeof window === 'undefined') {
		return create(initialState);
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		apolloClient = create(initialState);
	}

	return apolloClient;
}

export interface Options {
	getToken: () => string;
	fetchOptions?: {
		agent?: any;
	};
}
// import { ApolloClient, InMemoryCache, NormalizedCacheObject } from 'apollo-boost';
// import { createHttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
// import fetch from 'isomorphic-unfetch';
// import { isBrowser } from './isBrowser';

// let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// // Polyfill fetch() on the server (used by apollo-client)
// if (!isBrowser) {
// 	(global as any).fetch = fetch;
// }

// export interface Options {
// 	getToken: () => string;
// 	fetchOptions?: {
// 		agent?: any;
// 	};
// }

// function create(initialState: any, { getToken, fetchOptions }: Options) {
// 	const httpLink = createHttpLink({
// 		uri: 'https://api.graph.cool/simple/v1/cj5geu3slxl7t0127y8sity9r',
// 		credentials: 'same-origin',
// 		fetchOptions
// 	});

// 	const authLink = setContext((_, { headers }) => {
// 		const token = getToken();
// 		return {
// 			headers: {
// 				...headers,
// 				authorization: token ? `Bearer ${token}` : ''
// 			}
// 		};
// 	});

// 	// Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient

// 	return new ApolloClient({
// 		connectToDevTools: isBrowser,
// 		ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
// 		link: authLink.concat(httpLink),
// 		cache: new InMemoryCache().restore(initialState || {})
// 	});
// }

// export default function initApollo(initialState: any, options: Options) {
// 	// Make sure to create a new client for every server-side request so that data
// 	// isn't shared between connections (which would be bad)
// 	if (typeof window === 'undefined') {
// 		let fetchOptions = {};
// 		// If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
// 		// 'https-proxy-agent' is required here because it's a sever-side only module
// 		if (process.env.https_proxy) {
// 			fetchOptions = {
// 				agent: new (require('https-proxy-agent'))(process.env.https_proxy)
// 			};
// 		}
// 		return create(initialState, {
// 			...options,
// 			fetchOptions
// 		});
// 	}

// 	// Reuse client on the client-side
// 	if (!apolloClient) {
// 		apolloClient = create(initialState, options);
// 	}

// 	return apolloClient;
// }
