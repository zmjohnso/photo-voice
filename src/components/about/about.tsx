import { Box, CardMedia, Typography } from "@mui/material";
import React from "react";
import { LoadingIndicator } from "../loading-indicator/loading-indicator";
import { useLoaderData, useNavigation } from "react-router-dom";
import { AboutLoaderValue } from "../../loaders/about-loader";

export const About: React.FC = () => {
  const aboutPage = useLoaderData() as AboutLoaderValue;
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <LoadingIndicator />;
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
      paddingLeft="15rem"
      paddingRight="15rem"
      paddingTop="1rem"
      alignItems="center"
    >
      {aboutPage && (
        <CardMedia
          component="img"
          sx={{ width: "450px" }}
          image={aboutPage.fields.aboutPicture.fields.file.url}
          alt="About Page Image"
        />
      )}
      <Typography variant="body1" padding="1rem">
        フォトボイス・プロジェクトは、東日本大震災で被災した女性たちが、写真を通して自分たちの経験や感情を言葉にして共有し、地域や社会の問題を話し合う場をつくり、写真と「声」を通して、よりよい防災・災害対応・復興に向けて発信していくことを目的としている。
      </Typography>
      <Typography variant="body1" padding="1rem">
        現在、岩手県、宮城県、福島県に加え、多くの避難者が住む東京の7か所で活動している。これまで60人余のメンバーが参加。自分たちの生活や地域の状況を写真に撮り、小グループで継続して話し合い、メンバー自身が伝えたい「声」(メッセージ)をつくっている。「声」を英語に翻訳し、国内在住の外国人や海外にも発信している。写真と「声」の国内外での展示や写真集の出版、ホームページの充実、震災アーカイブへの掲載など、広範囲の発信により、震災の風化を防ぐとともに、被災した女性たちの経験や知見を防災・復興にいかしていく。
      </Typography>
      <Typography variant="body1" padding="1rem">
        The PhotoVoice Project creates space for women affected by the Great
        East Japan Disaster to share their experiences and emotions through
        photographs and &ldquo;voices&rdquo; (written messages), and discuss
        community and societal issues. Through these activities, the project
        seeks to inform more effective disaster prevention and response and
        reconstruction approaches.
      </Typography>
      <Typography variant="body1" padding="1rem">
        Currently, the project is operating in seven sites across Iwate, Miyagi,
        and Fukushima Prefectures, as well as Tokyo where a large number of
        evacuees reside. Over 60 women have participated. They take photographs
        of various aspects of their lives and communities and discuss them in
        small groups on an ongoing basis. Along the way, they create
        &ldquo;voices&rdquo; that they would like to share with society at
        large, which are also translated into English and shared with audiences
        overseas. These photos and &ldquo;voices&rdquo; are distributed
        throughout Japan and abroad via exhibitions and events, the publication
        of PhotoVoice books, websites, and archives on the disasters. With this
        wide range of publicity, we not only seek to preserve memory of the
        disasters, but also ensure that the experiences and insights of women
        are better incorporated into future disaster prevention and recovery
        efforts.
      </Typography>
    </Box>
  );
};
