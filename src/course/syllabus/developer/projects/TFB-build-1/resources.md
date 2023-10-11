# DevOps Resources

In modern DevOps, cloud infrastructures, especially platforms like AWS, GCP, and Azure, play an integral role. These platforms offer robust APIs that enable developers to provision and manage resources dynamically, streamlining operations and costs.

Why use Cloud APIs?
* Automation: Scripted provisioning removes manual errors.
* Scalability: Dynamically adapt to demand.
* Flexibility: Customise per requirements.
* Integration: Blend with CI/CD pipelines and other DevOps tools.

### Interacting with Cloud APIs
1. Setting Up:

Before making any requests to a cloud provider’s API, you need to ensure you have the correct permissions and authentication setup.

- Obtaining API Keys or Authentication Tokens:
    - Cloud providers typically use a combination of access keys, secret keys, or tokens for API authentication.
    - For AWS: You'll set up IAM (Identity and Access Management) users and grant them permissions. Once set up, you'll be provided with an Access Key ID and Secret Access Key. [Detailed AWS IAM Setup Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)



- Storing Credentials Securely:
    - Hardcoding or manually handling credentials can lead to security breaches.
    - [AWS secrets manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html) is a service that helps you protect access to your applications, services, and IT resources without the upfront infrastructure management. Secrets can be database credentials, passwords, third-party API keys, etc. AWS Secrets Manager Documentation.

2. Choosing an SDK:
    - Software Development Kits (SDKs) facilitate API interactions by providing pre-written code in various languages.
    - For AWS: The SDK is called Boto3. It offers Python interfaces to AWS services. With Boto3, you can create, configure, and manage AWS services.
    [Boto3 documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)
    
3. Making Requests:

Here, you communicate with the cloud service, requesting various operations.

- Provisioning: This refers to the allocation or reservation of cloud resources.
    E.g., Creating an EC2 instance or reserving a new RDS (Relational Database Service) instance in AWS.

- Configuration: After provisioning, resources might need additional settings or adjustments.
    E.g., Adjusting the security group of an EC2 instance or updating the database version in RDS.


- Monitoring: Cloud services often provide metrics, logs, or alerts to monitor the health and performance of your resources.
    - E.g., Using Amazon CloudWatch to get logs from a Lambda function or metrics from an EC2 instance. 
        [Cloudwatch documentation](https://aws.amazon.com/cloudwatch/)

- De-provisioning: When a resource is no longer required, it should be terminated or stopped to prevent incurring unnecessary charges.
    - E.g., Terminating an unused EC2 instance or deleting an obsolete S3 bucket.

4. Handling Responses:

Every API call receives a response. Handling these responses correctly is crucial.

Success Responses: Usually, a 2XX HTTP status code (like 200 OK). The response body might contain the details of the newly created resource, confirmation of the action taken, or data you requested.

Error Responses: Cloud APIs can respond with errors for various reasons – rate limits, failed authentication, unavailable resources, etc. For instance, AWS provides detailed error messages within an XML tag in the response. Knowing how to parse and react to these messages is essential. Handling AWS Error Messages
