"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  Instagram,
} from "lucide-react";
import { useLocale } from "next-intl";

const Footer = () => {
  const locale = useLocale();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const linkHoverVariants = {
    hover: {
      color: `var(--primary)`,
      x: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  // Sample data for better organization
  const quickLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "من نحن", path: "/about" },
    { name: "الخدمات", path: "/services" },
    { name: "اتصل بنا", path: "/contact" },
  ];

  const policies = [
    { name: "سياسة الخصوصية", path: `/${locale}/privacy&policies` },
    { name: "شروط الاستخدام", path: `/${locale}/privacy&policies` },
    { name: "سياسة الإرجاع", path: `/${locale}/privacy&policies` },
    { name: "الأسئلة الشائعة", path: `/${locale}/privacy&policies` },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "#0077B5" },
    { icon: Facebook, href: "#", label: "Facebook", color: "#1877F2" },
    { icon: Twitter, href: "#", label: "Twitter", color: "#1DA1F2" },
    { icon: Instagram, href: "#", label: "Instagram", color: "#E4405F" },
  ];

  return (
    <motion.footer
      className="bg-card backdrop-blur-xl pt-12 pb-6 rounded-t-3xl shadow-lg border-t border-muted/20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-10 gap-x-28 mb-12"
          variants={containerVariants}
        >
          {/* Company Info */}
          <motion.div
            className="text-center space-y-6 lg:col-span-4"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center lg:items-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mb-4"
              >
                <Image
                  src="/logoNoBg.png"
                  alt="Hexa Logo"
                  width={120}
                  height={80}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                />
              </motion.div>
              <p className="text-muted-foreground leading-relaxed max-w-[260px]">
                منصة هيكسا الرائدة في مجال التجارة الإلكترونية للمنتجات والخدمات
                المتعلقة بها في الشرق الأوسط
              </p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 text-center lg:text-right"
          >
            <h3 className="font-bold text-xl mb-5 text-center lg:text-right relative inline-block">
              <span className="relative z-10">روابط سريعة</span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover="hover"
                >
                  <motion.div variants={linkHoverVariants}>
                    <Link
                      href={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Policies & Contact */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 text-center lg:text-right"
          >
            <h3 className="font-bold text-xl mb-5 text-center lg:text-right relative inline-block">
              <span className="relative z-10">السياسات والدعم</span>
            </h3>
            <ul className="space-y-3">
              {policies.map((policy, index) => (
                <motion.li
                  key={policy.name}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover="hover"
                >
                  <motion.div variants={linkHoverVariants}>
                    <Link
                      href={policy.path}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {policy.name}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 text-center lg:text-right"
          >
            <h3 className="font-bold text-xl mb-5 text-center lg:text-right relative inline-block">
              <span className="relative z-10">روابط سريعة</span>
            </h3>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-3 text-sm">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span>info@hexa.com</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 text-sm">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span>+20 123 456 789</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex justify-center lg:justify-start gap-4 mt-6">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={href}
                    target="_blank"
                    className="bg-card hover:bg-secondary/50 p-2 rounded-full flex items-center justify-center shadow-sm border border-border"
                    aria-label={label}
                    style={{ color }}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          className="pt-6 border-t border-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.5,
              duration: 0.5,
            },
          }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              جميع الحقوق محفوظة لهيكسا © {new Date().getFullYear()}
            </motion.p>
            <motion.a
              href="https://ahmed-elmadany.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              مطور الواجهة: Ahmed ElMadany
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
