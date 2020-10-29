const notificationReducer = (state = 'Start state', action) => {
    console.log('state now: ', state)
    console.log('action', action)

    return state
}

export default notificationReducer