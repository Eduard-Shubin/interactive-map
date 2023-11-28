import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'marker',
    initialState: [
        {
            id: 'He81RhuacwfotrWk7tS7y',
            name: 'Кингури',
            description:
                'Древний восточный город, утопающий в атмосфере таинственности и богатства. Расположенный посреди живописных пустынь и оазисов, город известен своими изысканными дворцами, покрытыми узорчатыми коврами и украшенными золотом и драгоценными камнями.',
            img: ['images/sErZPQPDZEo.jpg'],
            position: [1, 8],
        },
        {
            id: 'tC6CTEqytY53kuTBlyLkR',
            name: 'Two',
            description: 'Two descr',
            img: ['images/QEXGBQpgXYw.jpg'],
            position: [1, 10],
        },
        {
            id: 'yOQkxEe_4vLBs3TSzKEjW',
            name: 'three',
            description: 'three descr',
            img: [
                'images/HIJyR8H7a2Q.jpg',
                'images/gdywmtFwgdU.jpg',
                'images/7HkDg5Vu-GQ.jpg',
            ],
            position: [1, 12],
        },
    ],
    reducers: {
        updateMarker: (state, action) => {
            const { id, name, description, img } = action.payload
            const existingMarker = state.find((marker) => marker.id === id)
            if (existingMarker) {
                existingMarker.name = name
                existingMarker.description = description
                existingMarker.img = img
            }
        },
        addMarker: (state, action) => {
            state.push(action.payload)
        },
        deleteMarker: (state, action) => {
            const { id } = action.payload
            return state.filter((marker) => marker.id !== id)
        },
    },
})

export const { updateMarker, addMarker, deleteMarker } = counterSlice.actions

export default counterSlice.reducer
