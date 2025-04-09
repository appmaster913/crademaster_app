import React from "react";
import { View, Text, ScrollView, StyleSheet, Linking } from "react-native";
import { useTranslation } from "react-i18next";

const ServiceTerms: React.FC = () => {
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      padding: 15,
      flex: 1,
    },
    sectionContainer: {
      marginBottom: 15,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
      color: "#D1D5DB", // text-gray-300 equivalent
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#D1D5DB",
    },
    generalText: {
      fontSize: 14,
      fontWeight: "300",
      color: "#D1D5DB",
      lineHeight: 20,
    },
    listContainer: {
      marginLeft: 36,
    },
    listItem: {
      flexDirection: "row",
      marginBottom: 8,
      paddingRight: 10,
    },
    bulletPoint: {
      width: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    link: {
      color: "#3B82F6", // blue-500
      textDecorationLine: "underline",
    },
    nestedList: {
      marginLeft: 20,
    },
  });

  const renderSection = (title: string, content: React.ReactNode) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{t(title)}</Text>
      {content}
    </View>
  );

  const renderListItem = (
    text: string,
    index: number,
    isNested: boolean = false
  ) => (
    <View key={index} style={[styles.listItem, isNested && styles.nestedList]}>
      <View style={styles.bulletPoint}>
        <Text style={styles.generalText}>{`${index + 1}.`}</Text>
      </View>
      <Text style={styles.generalText}>{text}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t("Service Terms and Conditions")}</Text>

      {/* Article 1 */}
      {renderSection(
        "Article 1: Purpose",
        <Text style={styles.generalText}>
          {t(
            `The purpose of these terms and conditions is to set forth the basic matters concerning the use and procedures of the membership service (hereinafter referred to as Service) between CradeMaster Ltd. (hereinafter referred to as Company) and its users (hereinafter referred to as Members).`
          )}
        </Text>
      )}

      {/* Article 2 */}
      {renderSection(
        "Article 2: Definitions of Terms",
        <View style={styles.listContainer}>
          {renderListItem(
            t("Site") +
              ": " +
              t(
                "refers to the virtual business platform established by the Company to provide services via information and communication facilities such as computers."
              ),
            0
          )}
          {renderListItem(
            t("Member") +
              ": " +
              t(
                "refers to an individual who accesses the Site and receives the services provided by the Company under these terms and conditions."
              ),
            1
          )}
          {renderListItem(
            t("Paid Service") +
              ": " +
              t(
                "refers to the cryptocurrency trading program offered by the Company, where a member can set a specific amount to use for a specified period of time based on the payment amount set by the Company."
              ),
            2
          )}
          {renderListItem(
            t("Deposit") +
              ": " +
              t(
                "refers to the cryptocurrency deposit service, where cryptocurrency assets are sent to the member's personal wallet generated within the program."
              ) +
              " " +
              t("Withdraw") +
              ": " +
              t(
                "refers to the service of transferring cryptocurrency assets from the member's personal wallet within the program to a registered cryptocurrency address for withdrawal."
              ),
            3
          )}
        </View>
      )}

      {/* Article 3 */}
      {renderSection(
        "Article 3: Effect and Amendment of the Terms",
        <View style={styles.listContainer}>
          {renderListItem(
            t(
              "These terms and conditions shall become effective once posted on the Company's website"
            ) +
              " (https://www.crademaster.com) " +
              t("and announced to members."),
            0
          )}
          {renderListItem(
            t(
              "The Company may amend these terms and conditions when necessary, and the amendments will be announced in the same manner as stated in paragraph 1."
            ),
            1
          )}
        </View>
      )}

      {/* Article 4 */}
      {renderSection(
        "Article 4: Application of the Terms",
        <Text style={styles.generalText}>
          {t(
            "These terms and conditions shall apply to the use of the Company's website, and matters not specified in these terms shall be governed by relevant laws and regulations."
          )}
        </Text>
      )}

      {/* Article 5 */}
      {renderSection(
        "Article 5: Membership Eligibility",
        <View style={styles.listContainer}>
          {renderListItem(
            t("Membership is limited to residents of Southa Korea."),
            0
          )}
          {renderListItem(
            t(
              "Membership is restricted to individuals and is not available to companies, organizations, or legal entities."
            ),
            1
          )}
          {renderListItem(
            t(
              "The minimum age for membership is 13 years old (middle school students or older)."
            ),
            2
          )}
          {renderListItem(
            t(
              "If a member violates these terms or submits false information, they may lose their membership."
            ),
            3
          )}
          {renderListItem(
            t(
              "If a member's eligibility is revoked under paragraph 4, they must reapply for membership."
            ),
            4
          )}
        </View>
      )}

      {/* Article 6 */}
      {renderSection(
        "Article 6: Establishment of the Use Agreement",
        <Text style={styles.generalText}>
          {t(
            "The service agreement is established upon the member's application to use the service, acceptance of the terms, and completion of registration."
          )}
        </Text>
      )}

      {/* Article 7 */}
      {renderSection(
        "Article 7: Membership Application",
        <View style={styles.listContainer}>
          {renderListItem(
            t(
              "Members must complete and submit the application form on the Company's website."
            ),
            0
          )}
          {renderListItem(
            t(
              "All information provided by the member in the application form is considered accurate, and members who submit false information may be restricted from using the service and may not receive legal protection."
            ),
            1
          )}
        </View>
      )}

      {/* Article 8 */}
      {renderSection(
        "Article 8: Consent to Use of Member Information",
        <View style={styles.listContainer}>
          {renderListItem(
            t(
              "The Company may collect minimal personal information necessary for the establishment and fulfillment of the service contract by legal and fair means."
            ),
            0
          )}
          {renderListItem(
            t(
              "By applying for membership under these terms and conditions, the member consents to the collection and use of their personal information as described in these terms and consents to the application of the Company's privacy policy to their personal data."
            ),
            1
          )}
          {renderListItem(
            t(
              "Members can access, modify, add, or delete their personal information at any time via the personal information modification page."
            ),
            2
          )}
        </View>
      )}

      {/* Article 9 */}
      {renderSection(
        "Article 9: Limitation on Acceptance of Membership Applications",
        <View style={styles.listContainer}>
          {renderListItem(
            t(
              "The Company will not accept applications in the following cases:"
            ),
            0
          )}
          <View style={styles.listContainer}>
            {renderListItem(
              t(
                "If the application is made using a false identity or pseudonym."
              ),
              0,
              true
            )}
            {renderListItem(t("If false information is provided."), 1, true)}
            {renderListItem(
              t(
                "If the applicant fails to meet the requirements specified by the Company."
              ),
              2,
              true
            )}
            {renderListItem(
              t(
                "If the acceptance of the application is difficult due to the applicant's fault."
              ),
              3,
              true
            )}
          </View>
          {renderListItem(
            t(
              "If the Company is unable to accept an application due to company circumstances, the application will not be accepted until the issue is resolved."
            ),
            1
          )}
          {renderListItem(
            t(
              "The Company must immediately notify the applicant if the application is rejected based on the above conditions."
            ),
            2
          )}
          {renderListItem(
            t("The Company will reject applications from minors or children."),
            3
          )}
        </View>
      )}

      {/* Article 10 */}
      {renderSection(
        "Article 10: Company's Obligations",
        <View style={styles.listContainer}>
          {renderListItem(
            t(
              "The Company is obligated to protect the member's personal information in accordance with the Company's privacy policy."
            ),
            0
          )}
          {renderListItem(
            t(
              "The Company will not disclose or distribute a member's personal information to third parties without the member's consent, except when required by law or authorized government bodies."
            ),
            1
          )}
          {renderListItem(
            t(
              "The Company must ensure the safety of the member's personal information by implementing technical and administrative measures as required by privacy protection regulations."
            ),
            2
          )}
          {renderListItem(
            t(
              "The Company must process any legitimate complaints or inquiries raised by the member. If immediate resolution is not possible, the Company must notify the member with the reason and a timeline for resolution."
            ),
            3
          )}
          {renderListItem(
            t(
              "The Company has the obligation to inform members of any changes in the commission rates related to the Paid Service via the website, program, or notices."
            ),
            4
          )}
        </View>
      )}

      {/* Article 11 */}
      {renderSection(
        "Article 11: Member's Obligations",
        <View style={styles.listContainer}>
          {renderListItem(
            t(
              "Members must comply with these terms and conditions, the usage guidelines, and any other notices issued by the Company."
            ),
            0
          )}
          {renderListItem(
            t(
              "Members must understand the cryptocurrency transfer system related to the Deposit and Withdrawal functions of the program. By agreeing to these terms, the Company assumes that members understand these functions. Members are responsible for ensuring the accuracy of wallet addresses before making deposits or withdrawals. Any loss or damage due to failure to verify the addresses will be the member's responsibility."
            ),
            1
          )}
          {renderListItem(
            t(
              "Members must review any commission fees related to the Paid Service and understand the details provided on the website or program."
            ),
            2
          )}
          {renderListItem(
            t("Members must not engage in the following actions:"),
            3
          )}
          <View style={styles.listContainer}>
            {renderListItem(
              t(
                "Using another member's ID and password fraudulently or transferring funds to unauthorized wallets."
              ),
              0,
              true
            )}
            {renderListItem(
              t(
                "Copying, processing, translating, or distributing information obtained through the service beyond personal use or providing it to third parties."
              ),
              1,
              true
            )}
            {renderListItem(
              t(
                "Damaging or harming the reputation of other members or the Company."
              ),
              2,
              true
            )}
            {renderListItem(
              t(
                "Infringing on the Company's copyrights, third-party copyrights, or other rights."
              ),
              3,
              true
            )}
            {renderListItem(
              t("Spreading information that violates public order or morals."),
              4,
              true
            )}
            {renderListItem(
              t(
                "Committing criminal acts or activities that may lead to legal action."
              ),
              5,
              true
            )}
            {renderListItem(
              t(
                "Infecting the system with viruses or spreading malicious software."
              ),
              6,
              true
            )}
            {renderListItem(
              t(
                "Disrupting the stable operation of the service by sending unauthorized information."
              ),
              7,
              true
            )}
            {renderListItem(t("Violating other applicable laws."), 8, true)}
          </View>
        </View>
      )}

      {/* Article 12 */}
      {renderSection(
        "Article 12: Restriction of Use",
        <View style={styles.listContainer}>
          {renderListItem(
            t(
              "The Company may restrict or suspend the use of the service without prior notice if the member's content or actions violate these terms, including but not limited to:"
            ),
            0
          )}
          <View style={styles.listContainer}>
            {renderListItem(
              t(
                "Defamation or harming the reputation of other members or third parties."
              ),
              0,
              true
            )}
            {renderListItem(
              t("Violations of public order or morals."),
              1,
              true
            )}
            {renderListItem(t("Involvement in criminal activities."), 2, true)}
            {renderListItem(
              t("Infringement of intellectual property rights."),
              3,
              true
            )}
            {renderListItem(
              t("Commercial or advertising activities."),
              4,
              true
            )}
            {renderListItem(
              t(
                "Uploading obscene materials or linking to inappropriate content."
              ),
              5,
              true
            )}
            {renderListItem(
              t("Other actions that violate the law or disrupt the service."),
              6,
              true
            )}
          </View>
        </View>
      )}

      {/* Article 13 */}
      {renderSection(
        "Article 13: Responsibility for Service Use",
        <Text style={styles.generalText}>
          {t(
            "The Company is not responsible for any loss or legal consequences (including criminal or civil cases) that arise due to violations of the terms, as described in Article 11."
          )}
        </Text>
      )}

      {/* Article 14 */}
      {renderSection(
        "Article 14: Service Availability",
        <View style={styles.listContainer}>
          {renderListItem(
            t(
              "The service is available 24 hours a day, 7 days a week, unless there is a specific reason such as technical difficulties."
            ),
            0
          )}
          {renderListItem(
            t(
              "The Company may limit service availability during scheduled maintenance or for other reasons, which will be communicated in advance on the website."
            ),
            1
          )}
        </View>
      )}

      {/* Article 15 */}
      {renderSection(
        "Article 15: Dispute Resolution",
        <View style={styles.listContainer}>
          {renderListItem(
            t(
              "The Company and the member must make all reasonable efforts to resolve any disputes amicably."
            ),
            0
          )}
          {renderListItem(
            t(
              "If a dispute cannot be resolved, the dispute will be handled in accordance with applicable laws, and the competent court will be designated for litigation."
            ),
            1
          )}
        </View>
      )}

      {/* Article 16 */}
      {renderSection(
        "Article 16: Disclaimer",
        <View style={styles.listContainer}>
          {renderListItem(
            t(
              "The Company may temporarily suspend service due to force majeure events such as natural disasters or technical problems."
            ),
            0
          )}
          {renderListItem(
            t(
              "The Company is not responsible for service disruptions caused by the member's actions."
            ),
            1
          )}
          {renderListItem(
            t(
              "The Company is not responsible for any loss of expected profits or other damages arising from the use of the service."
            ),
            2
          )}
        </View>
      )}

      {/* Effective Date */}
      {renderSection(
        "Effective Date",
        <Text style={styles.generalText}>
          {t("This agreement is effective from November 1, 2022.")}
        </Text>
      )}
    </ScrollView>
  );
};

export default ServiceTerms;
