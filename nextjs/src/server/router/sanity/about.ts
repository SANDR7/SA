import groq from "groq";
import { sanityClient } from "../../../libs/sanity";
import { getNowPlaying } from "../../../libs/spotify";
import { Sanity } from "../../../types/sanity/queries";
import { createRouter } from "../context";

export const AboutRouter = createRouter()
  .query("CV", {
    async resolve() {
      const CV = await sanityClient.fetch<Sanity.About.CV>(
        groq`*[_type== 'contributors' && name match 'Sander van Ast'][0] {
          name, 
          'file': business_file.asset->url
        }`
      );

      return CV;
    },
  })
  .query("socials", {
    async resolve() {
      const socials =
        await sanityClient.fetch<Sanity.About.Socials>(groq`*[_type== 'contributors' && name match 'Sander van Ast'][0] {
      'media': socials[][0..3]{
        name,
        link,
        // 'username': username,
      }

    }`);

      return socials;
    },
  })
  .query("now-playing", {
    async resolve() {
      const spotifyResponse = await getNowPlaying();

      const song = await spotifyResponse.json();

      if (!song.is_playing) return null;

      // const album = song.item.album.name;
      // const albumImageUrl = song.item.album.images[0].url;

      return {
        artist: song.item.artists
          .map((_artist: { name: string }) => _artist.name)
          .join(", "),
        isPlaying: song.is_playing,
        songUrl: song.item.external_urls.spotify,
        title: song.item.name,
      } as Sanity.About.SpotifyPlaying;
    },
  })
  .query("skills", {
    async resolve() {
      const skills = await sanityClient.fetch<
        Sanity.About.SkillsData[]
      >(groq`*[_type == 'skills'] | order(name asc) | order(type[0] asc){
       name,
        link,
        'type': type[0],
        'logo': {
          'image': logo.asset->url,
        }
      }`);

      return skills;
    },
  })
  .query("blog-posts", {
    async resolve() {
      const blogs = await sanityClient.fetch<Sanity.About.Posts[]>(groq`*[_type == 'blogs'] {
        excerpt,
        body,
        tags,
        'slug': slug.current,
        title,
        'createdAt': _createdAt,
      }`);

      return blogs;
    },
  });
