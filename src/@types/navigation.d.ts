export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: {undefined};
      quiz: { id: string, userId: number };
      history: {undefined};
      finish: { total: string, points: string , userId: number};
    }
  }
}