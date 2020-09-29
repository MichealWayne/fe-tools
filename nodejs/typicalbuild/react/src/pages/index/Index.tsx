import React from 'react'
import {Route} from 'react-router-dom'
import App from '@/views/App'


function Index() {
    return (
          <section>
              <Route exact path="/" component={App}/>
          </section>
    )
}

export default Index