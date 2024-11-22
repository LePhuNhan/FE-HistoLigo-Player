import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "../Help/Help.styles.css";
import Menu from "../../components/Menu/Menu";

const Privacy = () => {
  window.scrollTo(0, 0);
  const theme = localStorage.getItem("theme") === "true";
  const translations = {
    "en-US": {
      title: "PRIVACY",
      home: "HOME",
    },
    "vi-VN": {
      title: "RIÊNG TƯ",
      home: "TRANG CHỦ",
    },
  };
  const locale = localStorage.getItem("locale") || "vi-VN";
  const lang = translations[locale] || translations["vi-VN"];
  useEffect(() => {
    const darkThemeLink = document.getElementById("dark-theme-style");

    if (theme) {
      // Nếu theme là dark và file CSS chưa được thêm thì thêm vào
      if (!darkThemeLink) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/DarkMode.css"; // Đảm bảo đường dẫn đúng
        link.id = "dark-theme-style";
        document.head.appendChild(link);
      }
    } else {
      // Nếu theme không phải là dark thì xóa file CSS dark mode
      if (darkThemeLink) {
        darkThemeLink.remove(); // Xóa hoàn toàn thẻ link
      }
    }
  }, [theme]);
  return (
    <div className="wrapHelp">
      <Menu />
      {/* <Link to="/learn">
        <h1 className="title">HISTOLIGO</h1>
      </Link> */}

      <div className="breadCrumb">
        <Link to="/learn">
          <span style={{ color: "#1cb0f6" }}>{lang.home}</span>
        </Link>
        <RightOutlined />
        <span>{lang.title}</span>
        <div className="wrapRule">
          <h2>Privacy Policy</h2>
          <p style={{ color: "#999" }}>
            Please note that the Privacy Policy was last revised on September
            11, 2024
          </p>
          <div className="itemRule">
            <span style={{ color: "#3c3c3c" }}>1.</span>
            <p>
              <span
                style={{
                  color: "#3c3c3c",
                  display: "block",
                  marginBottom: "3px",
                  fontWeight: "600",
                }}
              >
                General
              </span>
              At Duolingo, we care about your personal information, so we have
              prepared this Privacy Policy to explain how we collect, use, and
              share it. This Privacy Policy applies to Duolingo websites, mobile
              apps, and related services (“Service”). By using the Service, you
              agree with Duolingo’s collection, use, and sharing of your
              personal information in accordance with the terms of this Privacy
              Policy.
            </p>
          </div>
          <div className="itemRule">
            <span style={{ color: "#3c3c3c" }}>2.</span>
            <p>
              <span
                style={{
                  color: "#3c3c3c",
                  display: "block",
                  marginBottom: "3px",
                  fontWeight: "600",
                }}
              >
                Information We Collect
              </span>
              The Service allows users to access and use a variety of
              educational services, including learning or practicing a language.
              Duolingo may, in its sole discretion and at any time, update,
              change, suspend, make improvements to or discontinue any aspect of
              the Service, temporarily or permanently.
            </p>
          </div>
          <div className="itemRule">
            <span style={{ color: "#3c3c3c" }}>3.</span>
            <p>
              <span
                style={{
                  color: "#3c3c3c",
                  display: "block",
                  marginBottom: "3px",
                  fontWeight: "600",
                }}
              >
                How We Process Your Information
              </span>
              You are responsible for your use of the Services, and for any use
              of the Services made using your account. Our goal is to create a
              positive, useful, and safe user experience. To promote this goal,
              we prohibit certain kinds of conduct that may be harmful to other
              users or to us. When you use the Services, you must comply with
              our Community Guidelines.{" "}
            </p>
          </div>
          <div className="itemRule">
            <span style={{ color: "#3c3c3c" }}>4.</span>
            <p>
              <span
                style={{
                  color: "#3c3c3c",
                  display: "block",
                  marginBottom: "3px",
                  fontWeight: "600",
                }}
              >
                Your Data Subject Rights
              </span>
              Some of our Services have additional terms and conditions
              (“Additional Terms”). Where Additional Terms apply to a Service,
              we will make them available for you to read through your use of
              that Service. By using that Service, you agree to the Additional
              Terms.
            </p>
          </div>
          <div className="itemRule">
            <span style={{ color: "#3c3c3c" }}>5.</span>
            <p>
              <span
                style={{
                  color: "#3c3c3c",
                  display: "block",
                  marginBottom: "3px",
                  fontWeight: "600",
                }}
              >
                Data Retention
              </span>
              In connection with registering for and using the Service, you
              agree (i) to provide accurate, current and complete information
              about you and/or your organization as requested by Duolingo; (ii)
              to maintain the confidentiality of your password and other
              information related to the security of your account; (iii) to
              maintain and promptly update any registration information you
              provide to Duolingo, to keep such information accurate, current
              and complete; and (iv) to be fully responsible for all use of your
              account and for any actions that take place through your account.
            </p>
          </div>
          <div className="itemRule">
            <span style={{ color: "#3c3c3c" }}>6.</span>
            <p>
              <span
                style={{
                  color: "#3c3c3c",
                  display: "block",
                  marginBottom: "3px",
                  fontWeight: "600",
                }}
              >
                Child Users
              </span>
              You represent and warrant to Duolingo that your access and use of
              the Service will be in accordance with these Terms and Conditions
              and with all applicable laws, rules, and regulations of the United
              States and any other relevant jurisdiction, including those
              regarding online conduct or acceptable content, and those
              regarding the transmission of data or information exported from
              the United States and/or the jurisdiction in which you reside. You
              further represent and warrant that you have created or own any
              material you submit via the Service (including Activity Materials
              and Content) and that you have the right, as applicable, to grant
              us a license to use that material as set forth above or the right
              to assign that material to us as set forth below.
            </p>
          </div>
          <div className="itemRule">
            <span style={{ color: "#3c3c3c" }}>7.</span>
            <p>
              <span
                style={{
                  color: "#3c3c3c",
                  display: "block",
                  marginBottom: "3px",
                  fontWeight: "600",
                }}
              >
                Duolingo ABC
              </span>
              As a condition of submitting any ratings, reviews, information,
              data, text, photographs, audio clips, audiovisual works,
              translations, flashcards, or other materials on the Service
              (collectively, “Content”), you hereby grant to Duolingo a
              full-paid, royalty free, perpetual, irrevocable, worldwide,
              nonexclusive, transferable, and sublicensable license to use,
              reproduce, copy, adapt, modify, merge, distribute, publicly
              display, and create derivative works from the Content; incorporate
              the Content into other works; and sublicense through multiple
              tiers the Content. You acknowledge that this license cannot be
              terminated by you once your Content is submitted to the Service.
              You represent that you own or have secured all legal rights
              necessary for the Content submitted by you to be used by you,
              Duolingo, and others as described and otherwise contemplated in
              these Terms and Conditions. You understand that other users will
              have access to the Content and that neither they or Duolingo have
              any obligation to you or anyone else to maintain the
              confidentiality of the Content.
            </p>
          </div>
          <div className="itemRule">
            <span style={{ color: "#3c3c3c" }}>8.</span>
            <p>
              <span
                style={{
                  color: "#3c3c3c",
                  display: "block",
                  marginBottom: "3px",
                  fontWeight: "600",
                }}
              >
                Do Not Track
              </span>
              You agree to defend, indemnify and hold harmless Duolingo and its
              directors, officers, employees, contractors, agents, suppliers,
              licensors, successors and assigns, from and against any and all
              losses, claims, causes of action, obligations, liabilities and
              damages whatsoever, including attorneys' fees, arising out of or
              relating to your access or use of the Service, any false
              representation made to us (as part of these Terms and Conditions
              or otherwise), your breach of any of these Terms and Conditions,
              or any claim that any translation we provide to you is inaccurate,
              inappropriate or defective in any way whatsoever.
            </p>
          </div>
          <div className="itemRule">
            <span style={{ color: "#3c3c3c" }}>9.</span>
            <p>
              <span
                style={{
                  color: "#3c3c3c",
                  display: "block",
                  marginBottom: "3px",
                  fontWeight: "600",
                }}
              >
                Links to Third-Party Websites
              </span>
              Subject to the terms of these Terms and Conditions, Duolingo
              grants you a non-transferable, non-exclusive license to download,
              install, and use one copy of each App in object code form only on
              an interactive wireless device that you own or control. You may
              not derive or attempt to derive the source code of all or any
              portion of any App, permit any third party to derive or attempt to
              derive such source code, or reverse engineer, decompile,
              disassemble, or translate any App or any part thereof. Duolingo
              and its licensors own and shall retain all intellectual property
              rights and other rights in and to the Apps, and any changes,
              modifications, or corrections thereto. The following terms and
              conditions apply to you only if you are using the Apps from the
              Apple App Store. To the extent the other terms and conditions of
              these Terms and Conditions are less restrictive than, or otherwise
              conflict with, the terms and conditions of this paragraph, the
              more restrictive or conflicting terms and conditions in this
              paragraph apply, but solely with respect to Apps from the Apple
              App Store. You acknowledge and agree that these Terms and
              Conditions are solely between you and Duolingo, not Apple, and
              that Apple has no responsibility for the Apps or content thereof.
              Your use of any App must comply with the App Store Terms of
              Service. You acknowledge that Apple has no obligation whatsoever
              to furnish any maintenance and support services with respect to
              the Apps. In the event of any failure of any App to conform to any
              applicable warranty, you may notify Apple, and Apple will refund
              the purchase price, if any, for the App to you; to the maximum
              extent permitted by applicable law, Apple will have no other
              warranty obligation whatsoever with respect to the Apps, and any
              other claims, losses, liabilities, damages, costs or expenses
              attributable to any failure to conform to any warranty will be
              solely governed by these Terms and Conditions. You and Duolingo
              acknowledge that Apple is not responsible for addressing any
              claims of you or any third party relating to the Apps or your
              possession and/or use of any App, including, but not limited to:
              (i) product liability claims; (ii) any claim that an App fails to
              conform to any applicable legal or regulatory requirement; and
              (iii) claims arising under consumer protection or similar
              legislation. You and Duolingo acknowledge that, in the event of
              any third-party claim that any App or your possession and use of
              that App infringes that third party’s intellectual property
              rights, Duolingo, not Apple, will be solely responsible for the
              investigation, defense, settlement and discharge of any such
              intellectual property infringement claim to the extent required by
              these Terms and Conditions. You must comply with applicable third
              party terms of agreement when using any App. You and Duolingo
              acknowledge and agree that Apple, and Apple’s subsidiaries, are
              third party beneficiaries of these Terms and Conditions as they
              relate to your license of the Apps, and that, upon your acceptance
              of these Terms and Conditions, Apple will have the right (and will
              be deemed to have accepted the right) to enforce these Terms and
              Conditions against you as a third party beneficiary thereof.
            </p>
          </div>
          <div className="itemRule">
            <span style={{ color: "#3c3c3c" }}>10.</span>
            <p>
              <span
                style={{
                  color: "#3c3c3c",
                  display: "block",
                  marginBottom: "3px",
                  fontWeight: "600",
                }}
              >
                Privacy Policy Updates
              </span>
              If you purchase an auto-renewing periodic subscription through the
              Service, your Duolingo account will be billed continuously for the
              subscription until you terminate it as set forth below. After your
              initial subscription period, and again after any subsequent
              subscription period, your subscription will automatically renew
              for an additional equivalent period. If you do not wish your
              subscription to renew automatically, or if you want to change or
              terminate your subscription, you will need to log in to your
              Duolingo account and follow instructions to terminate or change
              your subscription, even if you have deleted your account.
              <br />
              In the Service, you may purchase, with “real world” money, a
              limited, personal, non-transferable, non-sublicensable, revocable
              license to use (a) “virtual currency,” including but not limited
              to virtual gems, solely for use in the Service, and (b) “virtual
              in-app items” (together with “virtual currency,” “Virtual Items”).
              You are allowed to purchase Virtual Items through the Service, and
              not in any other way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
