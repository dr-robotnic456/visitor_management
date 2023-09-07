import Auth from '@/components/Auth'
import Overview from '@/components/Overview'

const Dashboard = ({setTitle}) => {
    return (
      <div>
        <Overview setTitle = {setTitle}/>
      </div>
    )
  }

export default Auth(Dashboard)