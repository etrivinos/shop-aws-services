import {beforeAll, describe, expect, jest, test} from '@jest/globals';

import { main as catalogBatchProcess } from './handler';
import * as publishToTopicFunctions from '@libs/sns/sns.publish-to-topic';
import * as dbQueriesFunctions from '@utils/db.queries';

import { products } from '@mocks/products.mock';
import { SQSEvent } from 'aws-lambda';
import { HTTPMessage } from '@utils/http.message';

describe('catalogBatchProcess', () => {
  const event: SQSEvent = {
    Records: <any>[
      ...products.map(product => ({ 'body': JSON.stringify(product) }))
    ]
  };

  beforeAll(() => {
    jest.spyOn(console, 'log').mockReturnValue(null);
  });

  test('should save product into database', async () => {
    const spyDynamoFunctions = jest.spyOn(dbQueriesFunctions, 'insertProduct').mockResolvedValue(<any>{})
    await catalogBatchProcess(event);
    expect(spyDynamoFunctions).toHaveBeenCalled();
  });

  test('should publisn event to topic', async () => {
    const spyPublishToTopicFunctions = jest.spyOn(publishToTopicFunctions, 'publishToTopic').mockResolvedValue({});
    await catalogBatchProcess(event);
    expect(spyPublishToTopicFunctions).toHaveBeenCalled();
  });

  describe('on error', () => {
    test('should capture insert product error', async () => {
      jest.spyOn(dbQueriesFunctions, 'insertProduct').mockRejectedValue({});
      const spyHttpService = jest.spyOn(HTTPMessage, 'internalServerError').mockReturnValue({});
      
      await catalogBatchProcess(event);
      expect(spyHttpService).toHaveBeenCalled();
    });

    test('should capture publish event to topic error', async () => {
      jest.spyOn(publishToTopicFunctions, 'publishToTopic').mockRejectedValue({});
      const spyHttpService = jest.spyOn(HTTPMessage, 'internalServerError').mockReturnValue({});
      
      await catalogBatchProcess(event);
      expect(spyHttpService).toHaveBeenCalled();
    });
  });

  test('should publisn event to topic', async () => {
    const spyPublishToTopicFunctions = jest.spyOn(publishToTopicFunctions, 'publishToTopic').mockResolvedValue({});
    await catalogBatchProcess(event);
    expect(spyPublishToTopicFunctions).toHaveBeenCalled();
  })
});
