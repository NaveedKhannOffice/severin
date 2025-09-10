import React from 'react'
import './styles.css'
import { Container, Row, Col } from 'react-bootstrap'
import Breadcrumbs from '../Breadcrumbs'

const PageHeader = (props) => {
  return (
    <section className="page-header">
      <Container>
        <Row>
          <Col xs={12} md={10} lg={8} xl={6} className="mx-auto text-center">
            <h2 className='text-center'>{props.pageHeading}</h2>
            {props.pageText && (
              <p className='text-white mb-0'>{props.pageText}</p>
            )}
            {props.breadcrumbPaths && (
              <Breadcrumbs
                paths={props.breadcrumbPaths}
                icon={props.breadcrumbIcon}
                separator={props.breadcrumbSeparator}
                className="mt-2"
              />
            )}
      
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default PageHeader