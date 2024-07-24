import React, {useCallback, useEffect, useState} from 'react';
import {Button, Checkbox, createTheme, FormControlLabel} from "@mui/material";


interface week {
    label: string
    mon: boolean,
    tue: boolean,
    wed: boolean,
    thu: boolean,
    fri: boolean,
    sat: boolean,
    sun: boolean,
}

const emtpyweek = {
    label: '',
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
}

interface plan {
    kcal: week
    arms: week,
    chest: week,
    abs: week,
    back: week,
    cardio: week
    cheat: week
}

const emptyState = {
    kcal: {
        ...emtpyweek,
        label: 'kcal',
    },
    abs: {
        ...emtpyweek,
        label: 'abs',
    },
    arms: {
        ...emtpyweek,
        label: 'arms',
    },
    chest: {
        ...emtpyweek,
        label: 'chest',
    },
    cardio: {
        ...emtpyweek,
        label: 'cardio',
    },
    back: {
        ...emtpyweek,
        label: 'back',
    },
    cheat: {
        ...emtpyweek,
        label: 'cheat',
    },
}

const STORAGE_KEY = 'sportsdays'


function App() {
    const [store, setStore] = useState<plan>(emptyState)

    useEffect(() => {
        const state = localStorage.getItem(STORAGE_KEY)
        if (state === null) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyState))
        } else {
            setStore(JSON.parse(state))
        }
    }, [setStore,])

    const write = useCallback((week: string, day: string, value: boolean) => {
        const tmp = {...store}
        // @ts-ignore
        tmp[week][day] = value
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tmp))
        setStore(tmp)
    }, [store])

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly'}}>
            <h2>weekly target: 4</h2>
            {store && Object.keys(store).map(key => {
                    // @ts-ignore
                    const w = store[key] as week
                    return <div key={w.label} style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-evenly'}}>
                        <div>{w.label}</div>
                        {Object.keys(w).filter(k => k !== 'label').map(day => {
                            // @ts-ignore
                            const value = w[day];
                            return <FormControlLabel sx={{margin: 0}} key={`${w.label}_${day}`} labelPlacement='top'
                                                     control={<Checkbox checked={value} onChange={ch => {
                                                         write(w.label, day, ch.target.checked)
                                                     }}/>} label={day}/>
                        })}
                    </div>
                }
                )
            }

            <Button onClick={() => {
                setStore(emptyState);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyState))

            }}>reset</Button>
        </div>
    );
}

export default App;
