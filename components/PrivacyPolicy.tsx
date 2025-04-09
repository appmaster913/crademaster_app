import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const Privacy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Section title={t("Privacy Policy")}>
          <Text style={styles.general}>
            {t(
              `Crademaster Ltd. (hereinafter referred to as Crademaster) places great importance on protecting the privacy of users and ensures that personal information provided by users during the use of the service (hereinafter referred to as "Crademaster") is protected. Crademaster complies with the relevant privacy protection regulations set out in laws such as the Communications Privacy Protection Act, Telecommunications Business Act, and Information and Communications Network Utilization Promotion Act.`
            )}
          </Text>
          <Text style={styles.general}>
            {t(
              `Through this privacy policy, Crademaster informs users of the purposes and methods of using their personal information and the measures taken to protect such information. Crademaster makes this privacy policy available on the homepage's main page, ensuring that it is easily accessible for users at all times.`
            )}
          </Text>
          <Text style={styles.general}>
            {t(
              `Crademaster may update this policy periodically due to changes in government laws and regulations or internal policies. Whenever this privacy policy is amended, Crademaster will post the changes immediately on the homepage, including the revision date, so that users can easily identify the updates. Users are encouraged to review this policy periodically when visiting the site.`
            )}
          </Text>
          <Text style={styles.general}>
            {t(`This privacy policy covers the following areas:`)}
          </Text>
        </Section>

        <View style={styles.divider} />

        <Section title={t("Consent for Collection of Personal Information")}>
          <Text style={styles.general}>
            {t(
              `Crademaster provides a process where users can click on a "Agree" button...`
            )}
          </Text>
        </Section>

        <View style={styles.divider} />

        <Section title={t("Purpose and Use of Collected Information")}>
          <Text style={styles.general}>
            {t(
              `Personal information refers to data about a living individual that can identify the person, such as name, phone number, and email address. Crademaster provides some services that can be used without registering, but in order to offer enhanced services, personal information is collected.`
            )}
          </Text>
          <Text style={styles.general}>
            {t(`The collected information is used as follows:`)}
          </Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>
              {t(
                "To develop more useful services based on personal information provided by users."
              )}
            </Text>
            <Text style={styles.listItem}>
              {t(
                "To identify users and improve communication through email, phone number, etc."
              )}
            </Text>
            <Text style={styles.listItem}>
              {t(
                "For providing personalized services, the information may be used to create user profiles."
              )}
            </Text>
          </View>
        </Section>

        <View style={styles.divider} />

        <Section
          title={t("Personal Information Collected and Collection Methods")}
        >
          <Text style={styles.general}>
            {t(
              "Crademaster collects essential information such as name, email, and contact number during the registration process. Additionally, users may voluntarily provide extra details when choosing to participate in events or for statistical analysis."
            )}
          </Text>
          <Text style={styles.general}>
            {t(
              "Sensitive personal data (e.g., race, religion, political views, criminal records, health status) is not collected unless absolutely necessary, and explicit consent is obtained beforehand."
            )}
          </Text>
        </Section>

        <View style={styles.divider} />
        <Section
          title={t("Retention and Usage Period of Personal Information")}
        >
          <Text style={styles.general}>
            {t(
              "Crademaster retains users' personal information as long as they use the service. When a user requests account deletion, the information will be deleted, except for the name and ID, and cannot be recovered. Legal obligations may require the retention of certain information for a specified period."
            )}
          </Text>
        </Section>

        <View style={styles.divider} />

        <Section title={t("User's Rights Regarding Personal Information")}>
          <Text style={styles.general}>
            {t(
              "Users can view, correct, or delete their personal information at any time by logging into their account. They may also request account deletion, and the information will be processed in accordance with retention periods mentioned above."
            )}
          </Text>
        </Section>

        <View style={styles.divider} />

        <Section title={t("Security Measures")}>
          <Text style={styles.general}>
            {t(
              "Crademaster takes necessary technical and administrative measures to protect users' personal information from loss, theft, leaks, or unauthorized modifications. This includes password protection, encryption of sensitive data, and secure transmission over the network."
            )}
          </Text>
        </Section>

        <View style={styles.divider} />

        <Section title={t("Sharing and Providing Personal Information")}>
          <Text style={styles.general}>
            {t(
              "Crademaster will not share users' personal information outside the purpose of collection without prior consent, except in the following cases:"
            )}
          </Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>
              {t("If the user has agreed to disclose the information.")}
            </Text>
            <Text style={styles.listItem}>
              {t(
                "If the information is shared due to legal obligations or to protect the rights of others."
              )}
            </Text>
            <Text style={styles.listItem}>
              {t("For statistical or academic purposes in an anonymized form.")}
            </Text>
          </View>
        </Section>
        <View style={styles.divider} />
        <Section
          title={t("Outsourcing the Processing of Personal Information")}
        >
          <Text style={styles.general}>
            {t(
              "Crademaster may outsource the processing of personal information to external providers to improve services. In such cases, Crademaster will inform users in advance and ensure that the providers comply with privacy protection regulations."
            )}
          </Text>
        </Section>

        <View style={styles.divider} />

        <Section title={t("Personal Information Inquiries and Complaints")}>
          <Text style={styles.general}>
            {t(
              "Crademaster provides users with a process to inquire or file complaints regarding their personal information. Contact details for privacy management are provided below:"
            )}
          </Text>
          <View style={styles.listContainer}>
            <Text style={styles.listItem}>{t("Name")}:</Text>
            <Text style={styles.listItem}>{t("Department")}:</Text>
            <Text style={styles.listItem}>{t("Phone Number")}:</Text>
            <Text style={styles.listItem}>{t("Email")}:</Text>
          </View>
        </Section>
      </View>
    </ScrollView>
  );
};

// Helper component for sections
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  content: {
    padding: 15,
    color: "white",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    color: "white",
  },
  general: {
    fontSize: 14,
    fontWeight: "300",
    marginBottom: 8,
    lineHeight: 20,
    color: "white",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 16,
  },
  listContainer: {
    marginLeft: 36,
    color: "white",
  },
  listItem: {
    fontSize: 14,
    fontWeight: "300",
    marginBottom: 8,
    color: "white",
  },
});

export default Privacy;
