const welcomeUser = (state = {}, action) => {
    switch (action.type) {

        case 'WELCOME_USER':
            return {
                ...state,
                [action.payload.name]: action.payload
            };
        default:
            return {...state}
    }
}

export default welcomeUser