import { faker } from '@faker-js/faker';

export const userPayload = function(){
    let email = faker.internet.email();
    let password = faker.internet.password();
    return {
                "email": email,
                "password": password,
                "passwordRepeat": password,
                "securityQuestion": {
                    "id": 1,
                    "question": "Your eldest siblings middle name?",
                    "createdAt": "2024-10-11T08:15:31.631Z",
                    "updatedAt": "2024-10-11T08:15:31.631Z"
                },
                "securityAnswer": "Steven Feest"
            };
}