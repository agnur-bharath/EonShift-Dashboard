// "use client";

// import { Text } from "@tremor/react";

// import PageContainer from "~/shared/custom/page-container";
// import PageHeading from "~/shared/custom/page-heading";
// import { Separator } from "~/shared/shadcn/ui/separator";

// const SettingsPage = () => {
//   return (
//     <PageContainer>
//       <PageHeading
//         mainTitle={"Settings Configuration"}
//         subTitle={
//           "This page allows us to configure the settings of the working model."
//         }
//       />
//       <Separator />
//       <Text>Sample</Text>
//     </PageContainer>
//   );
// };

// export default SettingsPage;

// "use client";

// import { Button, Card, Grid, Text, Title } from "@tremor/react";
// import PageContainer from "~/shared/custom/page-container";
// import PageHeading from "~/shared/custom/page-heading";
// import { Separator } from "~/shared/shadcn/ui/separator";

// const SystemConfiguration = () => {
//   return (
//     <PageContainer>
//     <PageHeading
//         mainTitle={"Settings and Configuration"}
//         subTitle={
//           "This page gives the access to the settings."
//         }
//       {/* <Title>Settings and Configuration</Title>
//       <Text>This page gives the access to the settings.</Text> */}
//       <Separator />
//       {/* Main section */}
//       <Card className="mt-6">
//         {/* <div className="h-96" /> */}
//         <Title>Join Us</Title>
//         <Text>Discover the benefits of joining our community.</Text>
//         <Button>Join Now</Button>
//       </Card>

//       {/* KPI section */}
//       <Grid numItemsMd={2} className="mt-6 gap-6">
//         {/* First Panel: Join Us */}
//         <Card>
//           <Title>Why Us ?</Title>
//           <Text>Learn why our platform is the right choice for you.</Text>
//           <Button>Explore</Button>
//         </Card>

//         {/* Second Panel: Monthly Subscription */}
//         <Card>
//           <Title>Monthly Subscription</Title>
//           <Text>
//             Explore our subscription plans and enjoy exclusive features.
//           </Text>
//           <Button>Subscribe</Button>
//         </Card>
//       </Grid>
//       </PageContainer>
//   );
// }

// export default Example;

"use client";

import { Button, Card, Grid, Text, Title } from "@tremor/react";

import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Separator } from "~/shared/shadcn/ui/separator";

const SettingsPage = () => {
  return (
    <PageContainer>
      <PageHeading
        mainTitle={"Settings Configuration"}
        subTitle={
          "This page allows us to configure the settings of the working model."
        }
      />
      <Separator />
      {/* <Text>Sample</Text> */}
      <Card className="mt-6">
        {/* <div className="h-96" /> */}
        <Title>Join Us</Title>
        <Text>Discover the benefits of joining our community.</Text>
        <Button>Join Now</Button>
      </Card>

      {/* KPI section */}
      <Grid numItemsMd={2} className="mt-6 gap-6">
        {/* First Panel: Join Us */}
        <Card>
          <Title>Why Us ?</Title>
          <Text>Learn why our platform is the right choice for you.</Text>
          <Button>Explore</Button>
        </Card>
        {/* Second Panel: Monthly Subscription */}
        <Card>
          <Title>Monthly Subscription</Title>
          <Text>
            Explore our subscription plans and enjoy exclusive features.
          </Text>
          <Button>Subscribe</Button>
        </Card>
      </Grid>
    </PageContainer>
  );
};

export default SettingsPage;
