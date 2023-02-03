import _ from 'underscore'
import { GraphQLClient, gql } from 'graphql-request'
import { validateURL } from './utils'
import config from './config'

class GQLUserQuery {
  private queryUrl : string

  private gqlClient : GraphQLClient

  constructor() {
    this.queryUrl = config.serviceUrl + '/api'
    this.gqlClient = new GraphQLClient(this.queryUrl, { headers: {} })
  }

  public async getLoggedInUser() : Promise<Maybe<AnyObject>> {
    const query = gql`
    query {
      getLoggedInUser {
        name,
        userTag,
        email,
        avatar
      }
    }
    `

    const response = await this.gqlClient.request(query)
    console.log('[GQL] getLoggedInUser\n', response)
    return response.getLoggedInUser
  }
}

export default new GQLUserQuery()
