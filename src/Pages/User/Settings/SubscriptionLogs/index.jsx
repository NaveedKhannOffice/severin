import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {} from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';

import withFilters from '../../../../HOC/withFilters ';
import { usePageTitle } from '../../../../Hooks/usePageTitle';
import { useFetchTableData } from '../../../../Hooks/useTable';

import { statusClassMap } from '../../../../Utils/Constants/SelectOptions';
import {
  subscriptionStatusFilters,
  subscriptionTypeFilters,
} from '../../../../Utils/Constants/TableFilter';
import {
  subscriptionLogsAssistantCoachHeaders,
  subscriptionLogsHeaders,
} from '../../../../Utils/Constants/TableHeaders';
import { formatDate, isNullOrEmpty, serialNum } from '../../../../Utils/Utils';
import CustomTable from '../../../../Components/CustomTable/CustomTable';
import { getSubscriptionLogsAssistantCoach } from '../../../../Services/AssistantCoach/SubscriptionLogs';

const AssistantCoachSubscriptionLogs = ({
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  usePageTitle('Subscription Logs');
  const navigate = useNavigate();
  let queryClient = useQueryClient();

  //GET SUBSCRIPTION LISTING
  const {
    data: fetchedData,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchTableData(
    'getSubscriptionLogsAssistantCoach',
    filters,
    updatePagination,
    getSubscriptionLogsAssistantCoach
  );

  // Provide a default value for `subscriptionLogs`
  const subscriptionLogs = fetchedData?.data ?? [];

  // if (isError) {
  //   showErrorToast(error);
  // }
  return (
    <>
      <div className="p-4 ps-xl-4 p-xxl-5 page-content content-bg-image rounded-20 profile-management">
        <h2 className="page-title mb-4">Subscription Logs</h2>
        <Row>
          <Col xs={12}>
            <CustomTable
              tableKey="subscription-logs"
              filters={filters}
              setFilters={setFilters}
              headers={subscriptionLogsAssistantCoachHeaders}
              pagination={pagination}
              isLoading={isLoading}
              centerLastHeader={true}
              selectOptions={[
                { title: 'status', options: subscriptionStatusFilters },
                { title: 'type', options: subscriptionTypeFilters },
              ]}
              dateFilters={[
                { title: 'Payment Date' }, // yields payment_date_from/to
                { title: 'Expire Date' },  // yields expire_date_from/to
              ]}
            >
              {(subscriptionLogs?.length || isError) && (
                <tbody>
                  {isError && (
                    <tr>
                      <td colSpan={subscriptionLogsHeaders.length}>
                        <p className="text-danger mb-0">
                          Unable to fetch data at this time
                        </p>
                      </td>
                    </tr>
                  )}
                  {subscriptionLogs?.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        {serialNum(
                        (filters?.page - 1) * filters?.per_page + index + 1
                      )}
                      </td>
                      <td>
                        {item?.subscription_plan?.id}
                      </td>
                      <td>{item?.subscription_plan?.duration}</td>
                      <td>${item?.subscription_plan?.price}</td>
                      <td>{item?.subscribed_on}</td>
                      <td>{item?.expired_on}</td>
                      <td>
                        <span
                          className={`status-tag ${
                            statusClassMap[
                              item?.is_active ? 'Active' : 'Inactive'
                            ]
                          }`}
                        >
                          {item?.is_active ? 'Active' : 'Expire'}
                        </span>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              )}
            </CustomTable>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default withFilters(AssistantCoachSubscriptionLogs);
