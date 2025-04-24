#!/bin/bash

# Replace AuthContext imports
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "../Context/AuthContext"|from "../../utils/auth-context"|g'
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "../../Context/AuthContext"|from "../../../utils/auth-context"|g'
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "./Context/AuthContext"|from "../utils/auth-context"|g'

# Replace FetchAccountInfo imports
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "../components/FetchAccountInfo/FetchAccountInfo"|from "../../utils/fetch-account-info"|g'
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "../../components/FetchAccountInfo/FetchAccountInfo"|from "../../../utils/fetch-account-info"|g'
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "./components/FetchAccountInfo/FetchAccountInfo"|from "../utils/fetch-account-info"|g'

# Replace sendEmail imports
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "../Actions/Emails/sendEmail"|from "../../lib/actions/send-email"|g'
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "../../Actions/Emails/sendEmail"|from "../../../lib/actions/send-email"|g'
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "./Actions/Emails/sendEmail"|from "../lib/actions/send-email"|g'

# Replace sendResetEmail imports
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "../Actions/Emails/sendResetEmail"|from "../../lib/actions/send-reset-email"|g'
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "../../Actions/Emails/sendResetEmail"|from "../../../lib/actions/send-reset-email"|g'
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "./Actions/Emails/sendResetEmail"|from "../lib/actions/send-reset-email"|g'

# Replace VerifyEmailTemplate imports
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "../components/email-templates/VerifyEmailTemplate"|from "../../utils/emails/verify-email-template"|g'
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "../../components/email-templates/VerifyEmailTemplate"|from "../../../utils/emails/verify-email-template"|g'
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "./components/email-templates/VerifyEmailTemplate"|from "../utils/emails/verify-email-template"|g'

# Replace ResetEmailPasswordTemplate imports
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "../components/email-templates/ResetEmailPasswordTemplate"|from "../../utils/emails/reset-password-template"|g'
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "../../components/email-templates/ResetEmailPasswordTemplate"|from "../../../utils/emails/reset-password-template"|g'
find /Users/chasedallmann/Documents/GitHub/CSC_Capstone/pages -type f -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" | xargs sed -i '' -e 's|from "./components/email-templates/ResetEmailPasswordTemplate"|from "../utils/emails/reset-password-template"|g'

echo "Updated imports in all files"