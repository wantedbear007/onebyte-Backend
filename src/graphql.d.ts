// for enabling typescript to import graphql files 

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const Schema: DocumentNode
  export = Schema
}