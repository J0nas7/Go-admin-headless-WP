// Internal dependencies
//import { useAPI } from '../'

export const useLoginMutation = () => {
    const loginQuery = `mutation LoginUser ($username: String!, $password: String!) {
        login(input: {username: $username, password: $password}) {
            authToken
            refreshToken
            user {
              id
              name
            }
        }
    }`;

    //const { rawAPIRequest } = useAPI()
    
    const loginMutation = (inputUsername : string, inputPassword: string) => {
        const loginVariables = { username: inputUsername, password: inputPassword }
        //return rawAPIRequest(loginQuery, loginVariables)
	}

	return { loginMutation }
};
