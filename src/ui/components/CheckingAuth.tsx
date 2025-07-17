import { AuthLayer } from '../../auth/layout/AuthLayer'

export const CheckingAuth = () => {
  return (
    <AuthLayer title='Loading...' logoIcono={false}>
      <img loading='lazy' className='rounded mx-auto d-block'
      width="40%" height="90%"
      src="http://a.top4top.net/p_1990j031.gif" alt="Loading"></img>
    </AuthLayer>
  )
}
