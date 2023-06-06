import { Day } from '../../types/models'

interface DayCardProps {
  day: Day
}

const DayCard = ( props: DayCardProps ): JSX.Element => {
  const { day } = props

  const formatDate = (dateStr: string): string => {
    const formattedDate = dateStr.slice(0,10)
    return formattedDate
  }

  return (
    <article>
      {formatDate(day.dayDate)}
      <br/>
      {day.weight} lbs
    </article>  
  )
}

export default DayCard