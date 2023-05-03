// External
import React, { useEffect, useState } from "react"

// Internal
import { Text } from '../'

/**
 * Renders a date format in varying formats.
 *
 * @param {string} props.dateObj Date obj to display.
 * @param {string} props.format Format of rendering.
 */

export const DateFormat = ({
    dateObj,
    format = 'full-pretty',
} : {
    dateObj: any,
    format?: string,
}) => {
    const [datePosted,setDatePosted] = useState<Date>()
    useEffect(() => {
        const date = new Date(dateObj)
        if (dateObj.match(/^[0-9]+$/) != null) {
            date.setTime(dateObj * 1000)
            setDatePosted(date)
        } else {
            if (date.getTime() > 0) {
                setDatePosted(date)
            } else { // Date object is empty/null
                setDatePosted(undefined)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let full_pretty_Text = "-"
    let small_Text = "-"

    if (datePosted) {
        const options : any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        full_pretty_Text = datePosted?.toLocaleDateString("da-DK", options)

        const month = ("0"+(datePosted!.getMonth()+1)).slice(-2)
        small_Text =    datePosted?.getDate()+"/"+
                            month+"-"+
                            datePosted?.getFullYear()
    }

    return (
        <Text variant="span" className="inline">
            { format === 'full-pretty' && (
                <Text variant="span" className="inline">
                    {full_pretty_Text}
                </Text>
            )}
            { format === 'small' && (
                <Text variant="span" className="inline">
                    {small_Text}
                </Text>
            )}
        </Text>
    )
}