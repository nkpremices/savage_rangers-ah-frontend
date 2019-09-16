import async from 'async';
import axios from '../../configs/axios';
import { GET_ARTICLES, ARTICLES_ERROR } from './GET_ARTICLES';

export default {
  getArticlesByCategory: (id, paginate) => (dispatch) => {
    axios
      .get(`/api/articles/category/${id}?offset=${paginate}&limit=10`)
      .then((res) => {
        const { paginationDetails } = res.data;
        const articles = res.data.data;
        async.each(articles, async (article, callback) => {
          await axios
            .get(`/api/articles/${article.slug}/stats`)
            .then((response) => {
              articles[articles.indexOf(article)].stats = response.data.article.stats;
            });
          await axios
            .get(`/api/articles/${article.slug}/ratings/statistics`)
            .then((response) => {
              articles[articles.indexOf(article)].rating = response.data.data;
            })
            .catch(() => {
              articles[articles.indexOf(article)].rating = { allUsers: 0, statistics: [] };
            });
          callback();
        }, () => {
          articles.pagination = paginationDetails;
          dispatch({ type: GET_ARTICLES, articlesData: articles });
        });
      })
      .catch((error) => {
        dispatch({ type: ARTICLES_ERROR, error });
      });
  }
};
